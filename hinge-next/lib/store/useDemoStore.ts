import { create } from "zustand";

interface PathState {
  isDemo: boolean | undefined;
  setIsDemo: (isDemo: boolean) => void;
}

export const useDemoStore = create<PathState>((set) => ({
  isDemo: undefined,
  setIsDemo: (isDemo) => set({ isDemo }),
}));
