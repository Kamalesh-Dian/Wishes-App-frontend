import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  jobTitle: string;
  company: string;
  defaultSignature: string;
  aiModelPref: string;
  emailHeaderTitle: string;
  emailCompanyFooter: string;
  emailAccentColor: string;
  setProfile: (data: Partial<ProfileState>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      jobTitle: 'People Operations Lead',
      company: 'Enterprise Corp',
      defaultSignature: 'Best regards,\nWishes AI Team',
      aiModelPref: 'Gemini 1.5 Flash',
      emailHeaderTitle: '🎉 Happy {occasion} {name}!',
      emailCompanyFooter: 'DIAN Technology Solutions',
      emailAccentColor: '#0d9488',
      setProfile: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'wishes-profile-storage',
    }
  )
);
