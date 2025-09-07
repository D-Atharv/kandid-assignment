import { create } from "zustand";

interface SidebarState {
  isOpen: boolean; // for mobile
  isCollapsed: boolean; // for desktop toggle
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

