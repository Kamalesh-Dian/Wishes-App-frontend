import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
}

interface AuthState {
  user: User | null;
  authInitialized: boolean;

  login: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  setAuthInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authInitialized: false,

      login: (user) =>
        set({
          user,
          authInitialized: true,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () =>
        set({
          user: null,
          authInitialized: true,
        }),

      setAuthInitialized: (initialized) =>
        set({
          authInitialized: initialized,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
