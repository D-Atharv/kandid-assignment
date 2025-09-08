"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  batchSize?: number;
  isLoading?: boolean;
}

interface TimelineEvent {
  title: string;
  time?: string;
  status: "completed" | "pending" | "rejected";
}

export function LeadsDataTable<
  TData extends {
    id: string | number;
    name: string;
    email?: string;
    phone?: string;
    timeline?: TimelineEvent[];
  },
  TValue,
>({
  columns,
  data,
  batchSize = 20,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const [displayedRows, setDisplayedRows] = React.useState<TData[]>(
    data.slice(0, batchSize)
  );
  const [loadingMore, setLoadingMore] = React.useState(false);

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<TData | null>(null);

  const table = useReactTable({
    data: displayedRows,
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
    if (!tableContainerRef.current || loadingMore || isLoading) return;
    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (displayedRows.length < data.length) {
        setLoadingMore(true);
        setTimeout(() => {
          setDisplayedRows((prev) =>
            data.slice(0, Math.min(prev.length + batchSize, data.length))
          );
          setLoadingMore(false);
        }, 500);
      }
    }
  };

  React.useEffect(() => {
    setDisplayedRows(data.slice(0, batchSize));
  }, [data, batchSize]);

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
        className="overflow-y-scroll rounded-xl shadow-lg shadow-gray-400 bg-white max-h-[600px] pr-2"
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
            {/* Skeleton */}
            {isLoading
              ? Array.from({ length: batchSize }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`} className="animate-pulse">
                    {columns.map((_, j) => (
                      <TableCell key={`skeleton-${i}-${j}`}>
                        <Skeleton className="h-4 w-full" />
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

            {/* Loading more */}
            {!isLoading && loadingMore && (
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
        onUpdateStatus={(leadId, newStatus) => {
          setSelectedLead((prev) =>
            prev && prev.id === leadId ? { ...prev, status: newStatus } : prev
          );

          setDisplayedRows((prevRows) =>
            prevRows.map((row) =>
              row.id === leadId ? { ...row, status: newStatus } : row
            )
          );
        }}
      />
    </div>
  );
}
