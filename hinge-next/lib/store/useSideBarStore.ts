import { create } from "zustand";

type SideBarStore = {
  page: string;
  setPage: (page: string) => void;
};

export const useSideBarStore = create<SideBarStore>((set) => ({
  page: "",
  setPage: (newPage) => set({ page: newPage }),
}));
