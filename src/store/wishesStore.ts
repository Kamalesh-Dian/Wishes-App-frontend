import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const safeSessionStorage = {
  getItem: (name: string): string | null => {
    try {
      return sessionStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      sessionStorage.setItem(name, value);
    } catch {
      // ignore in incognito or restricted storage
    }
  },
  removeItem: (name: string): void => {
    try {
      sessionStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
};

interface WishState {
  uploadedImage: string | null;
  occasion: string;
  theme: string;
  people: string[];
  decorations: string[];
  customMessage: string;
  additionalInformation: string;
  animationEnabled: boolean;
  aiEngine: string;
  currentStep: number;
  generatedImage: string | null;
  photoConsent: boolean;

  setAdditionalInformation: (info: string) => void;
  setGeneratedImage: (url: string) => void;
  setImage: (img: string | null) => void;
  setOccasion: (occasion: string) => void;
  setTheme: (theme: string) => void;
  setPeople: (people: string[]) => void;
  setDecorations: (decorations: string[]) => void;
  setCustomMessage: (message: string) => void;
  setAnimation: (state: boolean) => void;
  setAIEngine: (engine: string) => void;
  setPhotoConsent: (consent: boolean) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWish: () => void;
}

export const useWishStore = create<WishState>()(
  persist(
    (set) => ({
      uploadedImage: null,
      occasion: "",
      theme: "",
      people: [],
      decorations: [],
      customMessage: "",
      additionalInformation: "",
      animationEnabled: false,
      aiEngine: "gemini",
      currentStep: 1,
      generatedImage: null,
      photoConsent: false,

      setAdditionalInformation: (info) =>
        set({
          additionalInformation: info,
        }),

      setImage: (img) =>
        set({
          uploadedImage: img,
        }),

      setOccasion: (occasion) =>
        set({
          occasion,
        }),

      setTheme: (theme) =>
        set({
          theme,
        }),

      setPeople: (people) =>
        set({
          people,
        }),

      setDecorations: (decorations) =>
        set({
          decorations,
        }),

      setCustomMessage: (message) =>
        set({
          customMessage: message,
        }),

      setAnimation: (state) =>
        set({
          animationEnabled: state,
        }),

      setAIEngine: (engine) =>
        set({
          aiEngine: engine,
        }),

      setPhotoConsent: (consent) =>
        set({
          photoConsent: consent,
        }),

      setCurrentStep: (step) =>
        set({
          currentStep: step,
        }),
        
      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep < 9 ? state.currentStep + 1 : state.currentStep,
        })),
        
      prevStep: () =>
        set((state) => ({
          currentStep: state.currentStep > 1 ? state.currentStep - 1 : state.currentStep,
        })),

      setGeneratedImage: (url) =>
        set({
          generatedImage: url,
        }),

      resetWish: () =>
        set({
          uploadedImage: null,
          occasion: "",
          theme: "",
          people: [],
          decorations: [],
          customMessage: "",
          additionalInformation: "",
          animationEnabled: false,
          currentStep: 1,
          generatedImage: null,
          aiEngine: "gemini",
          photoConsent: false,
        }),
    }),
    {
      name: "wish-draft-storage",
      storage: createJSONStorage(() => safeSessionStorage),
    },
  ),
);
