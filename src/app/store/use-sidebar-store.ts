import { create } from "zustand";

/**
 * Zustand store for managing sidebar state.
 * - isOpen: controls sidebar visibility on mobile.
 * - isCollapsed: controls sidebar collapsed state on desktop.
 * - toggle: toggles the collapsed state.
 * - open: opens the sidebar (mobile).
 * - close: closes the sidebar (mobile).
 */
interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
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
