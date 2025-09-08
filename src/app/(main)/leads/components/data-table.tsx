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
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onUpdateStatus: (leadId: string | number, newStatus: string) => void;
}

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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<TData | null>(null);

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
