import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

export type PlanTier = "free" | "pro" | "ultimate";

export interface PlanConfig {
  id: PlanTier;
  name: string;
  price: string;
  priceNumeric: number;
  imageLimit: number;
  videoLimit: number;
  totalGenerations: number;
  canScheduleEvents: boolean;
  canConnectOneDrive: boolean;
  badge?: string;
  description: string;
  highlights: string[];
}

export const PLAN_CONFIGS: Record<PlanTier, PlanConfig> = {
  free: {
    id: "free",
    name: "Free",
    price: "$0",
    priceNumeric: 0,
    imageLimit: 5,
    videoLimit: 3,
    totalGenerations: 8,
    canScheduleEvents: false,
    canConnectOneDrive: false,
    description: "Personal starter package to create individual celebrations.",
    highlights: [
      "5 AI image generations",
      "3 AI video generations",
      "Standard celebration presets",
      "Direct image & video download",
      "Single-wish creation only",
      "No event scheduling",
      "No OneDrive sync",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: "$5",
    priceNumeric: 5,
    imageLimit: 40,
    videoLimit: 10,
    totalGenerations: 50,
    canScheduleEvents: true,
    canConnectOneDrive: false,
    badge: "MOST POPULAR",
    description: "50 generations (40 images, 10 videos of 8s each) with event scheduling for active celebrants.",
    highlights: [
      "40 4K studio image generations",
      "10 animated celebration video generations (8s each)",
      "Total 50 generations per month",
      "Milestone event calendar & scheduling enabled",
      "Manual Excel roster import (.xlsx)",
      "Priority FLUX GPU generation queue",
      "No OneDrive sync (manual upload only)",
    ],
  },
  ultimate: {
    id: "ultimate",
    name: "Ultimate",
    price: "$12",
    priceNumeric: 12,
    imageLimit: 75,
    videoLimit: 25,
    totalGenerations: 100,
    canScheduleEvents: true,
    canConnectOneDrive: true,
    badge: "NO RESTRICTIONS",
    description: "100 generations (75 images, 25 videos of 8s each) with 24/7 OneDrive sync and zero restrictions.",
    highlights: [
      "75 4K ultra-HD image generations",
      "25 cinematic celebration video generations (8s each)",
      "Total 100 generations per month",
      "Full milestone event scheduling",
      "Automated OneDrive & Microsoft 365 cloud sync",
      "Automated local 9:00 AM delivery dispatch",
      "Zero restrictions & commercial usage rights",
    ],
  },
};

export interface DummyAccount {
  email: string;
  displayName: string;
  tier: PlanTier;
  label: string;
  badge: string;
  description: string;
}

export const DUMMY_ACCOUNTS: Record<string, DummyAccount> = {
  "free@wishes.ai": {
    email: "free@wishes.ai",
    displayName: "Alex Free",
    tier: "free",
    label: "Free Plan ($0)",
    badge: "5 Images • 3 Videos • No Schedule/OneDrive",
    description: "Test the Free tier limitations: 5 images, 3 videos, scheduling & OneDrive locked.",
  },
  "pro@wishes.ai": {
    email: "pro@wishes.ai",
    displayName: "Sarah Pro",
    tier: "pro",
    label: "Pro Plan ($5/mo)",
    badge: "40 Images • 10 Videos (8s) • Events Enabled • No OneDrive",
    description: "Test the $5 Pro tier: 50 generations (40 images, 10 videos 8s), event scheduling unlocked, OneDrive locked.",
  },
  "ultimate@wishes.ai": {
    email: "ultimate@wishes.ai",
    displayName: "Maya Ultimate",
    tier: "ultimate",
    label: "Ultimate Plan ($12/mo)",
    badge: "75 Images • 25 Videos (8s) • All Features & OneDrive",
    description: "Test the $12 Ultimate tier: 100 generations (75 images, 25 videos 8s), full scheduling, OneDrive auto-sync.",
  },
};

export const resolveTierFromEmail = (email: string | null | undefined): PlanTier => {
  if (!email) return "free";
  const normalized = email.trim().toLowerCase();
  if (
    normalized.includes("ultimate") ||
    normalized.includes("enterprise") ||
    normalized.includes("team") ||
    normalized.includes("12")
  ) {
    return "ultimate";
  }
  if (normalized.includes("pro") || normalized.includes("5")) {
    return "pro";
  }
  return "free";
};

interface SubscriptionState {
  tier: PlanTier;
  usedImages: number;
  usedVideos: number;
  userEmail: string | null;
  isUpgradeModalOpen: boolean;
  upgradeModalReason: string | null;

  // Actions
  fetchSubscriptionStatus: () => Promise<void>;
  setPlan: (tier: PlanTier) => void;
  syncUserEmail: (email: string | null) => void;
  recordImageGeneration: () => void;
  recordVideoGeneration: () => void;
  resetUsage: () => void;
  openUpgradeModal: (reason?: string) => void;
  closeUpgradeModal: () => void;

  // Query helpers
  canGenerateImage: () => boolean;
  canGenerateVideo: () => boolean;
  canScheduleEvents: () => boolean;
  canConnectOneDrive: () => boolean;
  getRemainingImages: () => number;
  getRemainingVideos: () => number;
  getPlanConfig: () => PlanConfig;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      tier: "free",
      usedImages: 0,
      usedVideos: 0,
      userEmail: null,
      isUpgradeModalOpen: false,
      upgradeModalReason: null,

      fetchSubscriptionStatus: async () => {
        try {
          const res = await api.get<{
            success: boolean;
            plan: PlanTier;
            usedImages?: number;
            usedVideos?: number;
          }>("/api/me");
          if (res.data?.success && res.data.plan) {
            set({
              tier: res.data.plan,
              usedImages: res.data.usedImages ?? 0,
              usedVideos: res.data.usedVideos ?? 0,
            });
          }
        } catch {
          // Keep existing state if offline or endpoint fails
        }
      },

      setPlan: (tier: PlanTier) => {
        set({ tier });
      },

      syncUserEmail: (email: string | null) => {
        if (!email) {
          set({ userEmail: null });
          return;
        }
        const assignedTier = resolveTierFromEmail(email);
        set((state) => {
          // If switching user, initialize their email and appropriate tier
          if (state.userEmail !== email) {
            return {
              userEmail: email,
              tier: assignedTier,
              // Keep usage intact or reset if different dummy account
              usedImages: 0,
              usedVideos: 0,
            };
          }
          return { userEmail: email };
        });
      },

      recordImageGeneration: () => {
        set((state) => ({ usedImages: state.usedImages + 1 }));
      },

      recordVideoGeneration: () => {
        set((state) => ({ usedVideos: state.usedVideos + 1 }));
      },

      resetUsage: () => {
        set({ usedImages: 0, usedVideos: 0 });
      },

      openUpgradeModal: (reason?: string) => {
        set({ isUpgradeModalOpen: true, upgradeModalReason: reason || null });
      },

      closeUpgradeModal: () => {
        set({ isUpgradeModalOpen: false, upgradeModalReason: null });
      },

      canGenerateImage: () => {
        const state = get();
        const config = PLAN_CONFIGS[state.tier];
        return state.usedImages < config.imageLimit;
      },

      canGenerateVideo: () => {
        const state = get();
        const config = PLAN_CONFIGS[state.tier];
        return state.usedVideos < config.videoLimit;
      },

      canScheduleEvents: () => {
        const state = get();
        return PLAN_CONFIGS[state.tier].canScheduleEvents;
      },

      canConnectOneDrive: () => {
        const state = get();
        return PLAN_CONFIGS[state.tier].canConnectOneDrive;
      },

      getRemainingImages: () => {
        const state = get();
        const config = PLAN_CONFIGS[state.tier];
        return Math.max(0, config.imageLimit - state.usedImages);
      },

      getRemainingVideos: () => {
        const state = get();
        const config = PLAN_CONFIGS[state.tier];
        return Math.max(0, config.videoLimit - state.usedVideos);
      },

      getPlanConfig: () => {
        const state = get();
        return PLAN_CONFIGS[state.tier];
      },
    }),
    {
      name: "wishes-subscription-storage",
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const state = (persistedState || {}) as Partial<SubscriptionState>;
        if (version < 2) {
          return {
            ...state,
            usedImages: 0,
            usedVideos: 0,
          };
        }
        return state;
      },
      partialize: (state) => ({
        tier: state.tier,
        usedImages: state.usedImages,
        usedVideos: state.usedVideos,
        userEmail: state.userEmail,
      }),
    }
  )
);
