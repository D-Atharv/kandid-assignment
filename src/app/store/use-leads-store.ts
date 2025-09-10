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

/**
 * Zustand store for managing leads-related state in the application.
 *
 * @template T - The type representing a Lead.
 *
 * @property {Array} sorting - The current sorting configuration for leads.
 * @property {Record<string, boolean>} rowSelection - The selected rows in the leads table.
 * @property {string} globalFilter - The global filter string for searching leads.
 * @property {boolean} sheetOpen - Indicates whether the lead details sheet is open.
 * @property {T | null} selectedLead - The currently selected lead, or null if none is selected.
 * @property {string} newStatus - The new status to be set for a lead.
 *
 * @method setSorting - Updates the sorting configuration.
 * @param {(updater: Array | ((sorting: Array) => Array))} updater - New sorting or updater function.
 *
 * @method setRowSelection - Updates the row selection state.
 * @param {(updater: Record<string, boolean> | ((rowSelection: Record<string, boolean>) => Record<string, boolean>))} updater - New row selection or updater function.
 *
 * @method setGlobalFilter - Sets the global filter string.
 * @param {string} filter - The filter string to set.
 *
 * @method setSheetOpen - Sets the state of the lead details sheet.
 * @param {boolean} open - Whether the sheet should be open.
 *
 * @method setSelectedLead - Sets the currently selected lead.
 * @param {T | null} lead - The lead to select, or null to deselect.
 *
 * @method setNewStatus - Sets the new status for a lead.
 * @param {string} status - The new status to set.
 */
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
