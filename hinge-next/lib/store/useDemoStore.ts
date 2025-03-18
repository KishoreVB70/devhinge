import { create } from "zustand";

interface PathState {
  isDemo: boolean;
  setIsDemo: (isDemo: boolean) => void;
}

export const useDemoStore = create<PathState>((set) => ({
  isDemo: false,
  setIsDemo: (isDemo) => set({ isDemo }),
}));
