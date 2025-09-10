"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { LeadProfileSheet } from "./profile-sheet";
import { useLeadsStore } from "@/app/store/use-leads-store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onUpdateStatus: (leadId: string | number, newStatus: string) => void;
}

/**
 * Renders a data table for displaying leads with sorting, filtering, row selection, and infinite scrolling capabilities.
 *
 * @template TData - The type of data for each row, must include `id`, `name`, and optionally `status`.
 * @template TValue - The type of value for table columns.
 *
 * @param props.columns - Array of column definitions for the table.
 * @param props.data - Array of lead data to display in the table.
 * @param props.isLoading - Indicates if the initial data is loading.
 * @param props.fetchNextPage - Function to fetch the next page of data for infinite scrolling.
 * @param props.hasNextPage - Indicates if there are more pages to fetch.
 * @param props.isFetchingNextPage - Indicates if the next page is currently being fetched.
 * @param props.onUpdateStatus - Callback to update the status of a lead.
 *
 * @returns A React component that displays a searchable, sortable, and infinitely scrollable table of leads.
 *
 * @remarks
 * - Uses `useLeadsStore` for state management (sorting, selection, filtering, sheet state).
 * - Integrates with `useReactTable` for table logic.
 * - Displays a skeleton loader while loading.
 * - Opens a lead profile sheet when a row is clicked.
 */
export function LeadsDataTable<
  TData extends { id: string | number; name: string; status?: string },
  TValue,
>({
  columns,
  data,
  isLoading = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onUpdateStatus,
}: DataTableProps<TData, TValue>) {
  const {
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter,
    sheetOpen,
    setSheetOpen,
    selectedLead,
    setSelectedLead,
  } = useLeadsStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, rowSelection, globalFilter },
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const openSheet = (lead: TData) => {
    setSelectedLead(lead);
    setSheetOpen(true);
  };

  const handleScroll = () => {
    if (!tableContainerRef.current || isLoading || isFetchingNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (hasNextPage && fetchNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div
        ref={tableContainerRef}
        onScroll={handleScroll}
        className="overflow-y-scroll rounded-xl shadow-lg shadow-gray-400 bg-white max-h-[590px] pr-2"
      >
        <Table className="min-w-full text-sm md:text-base">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`} className="animate-pulse">
                    {columns.map((_, j) => (
                      <TableCell key={`skeleton-${i}-${j}`}>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openSheet(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

            {isFetchingNextPage && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-sm text-muted-foreground"
                >
                  Loading more...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <LeadProfileSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        selectedLead={selectedLead}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
}
