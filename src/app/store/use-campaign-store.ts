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
