"use client";
import { create } from "zustand";
import { SortingState, RowSelectionState } from "@tanstack/react-table";

type CampaignFilter = "all" | "active" | "inactive";

// ✅ Table store
interface CampaignTableStore {
  sorting: SortingState;
  setSorting: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;

  rowSelection: RowSelectionState;
  setRowSelection: (
    updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
  ) => void;

  globalFilter: string;
  setGlobalFilter: (updater: string | ((old: string) => string)) => void;
}

/**
 * Zustand store for managing the state of the campaign table.
 *
 * @remarks
 * This store provides state and updater functions for sorting, row selection, and global filtering
 * in the campaign table. Each updater function accepts either a new value or an updater function.
 *
 * @property {Array} sorting - The current sorting state of the table.
 * @property {(updater: ((sorting: any[]) => any[]) | any[]) => void} setSorting - Updates the sorting state.
 * @property {Record<string, boolean>} rowSelection - The current row selection state.
 * @property {(updater: ((rowSelection: Record<string, boolean>) => Record<string, boolean>) | Record<string, boolean>) => void} setRowSelection - Updates the row selection state.
 * @property {string} globalFilter - The current global filter value.
 * @property {(updater: ((globalFilter: string) => string) | string) => void} setGlobalFilter - Updates the global filter value.
 */
export const useCampaignTableStore = create<CampaignTableStore>((set) => ({
  sorting: [],
  setSorting: (updater) =>
    set((state) => ({
      sorting: typeof updater === "function" ? updater(state.sorting) : updater,
    })),

  rowSelection: {},
  setRowSelection: (updater) =>
    set((state) => ({
      rowSelection:
        typeof updater === "function" ? updater(state.rowSelection) : updater,
    })),

  globalFilter: "",
  setGlobalFilter: (updater) =>
    set((state) => ({
      globalFilter:
        typeof updater === "function" ? updater(state.globalFilter) : updater,
    })),
}));

// ✅ Page store
interface CampaignPageStore {
  filter: CampaignFilter;
  setFilter: (filter: CampaignFilter) => void;
}

export const useCampaignPageStore = create<CampaignPageStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
