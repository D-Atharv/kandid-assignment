import {
  SortingState,
  Updater,
  RowSelectionState,
} from "@tanstack/react-table";
import { create } from "zustand";

type Lead = {
  id: string | number;
  name: string;
  status?: string;
};

interface LeadsStore<TData extends Lead> {
  sorting: SortingState;
  rowSelection: RowSelectionState;
  globalFilter: string;
  sheetOpen: boolean;
  selectedLead: TData | null;
  newStatus: string;

  // TanStack-compatible setters
  setSorting: (updater: Updater<SortingState>) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  setGlobalFilter: (filter: string) => void;
  setSheetOpen: (open: boolean) => void;
  setSelectedLead: (lead: TData | null) => void;
  setNewStatus: (status: string) => void;
}

export const useLeadsStore = create<LeadsStore<Lead>>((set) => ({
  sorting: [],
  rowSelection: {},
  globalFilter: "",
  sheetOpen: false,
  selectedLead: null,
  newStatus: "",

  setSorting: (updater) =>
    set((state) => ({
      sorting: typeof updater === "function" ? updater(state.sorting) : updater,
    })),

  setRowSelection: (updater) =>
    set((state) => ({
      rowSelection:
        typeof updater === "function" ? updater(state.rowSelection) : updater,
    })),

  setGlobalFilter: (filter) => set({ globalFilter: filter }),
  setSheetOpen: (open) => set({ sheetOpen: open }),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  setNewStatus: (status) => set({ newStatus: status }),
}));
