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
import { Campaign } from "@/lib/data";
import { useCampaignTableStore } from "@/app/store/use-campaign-store";

interface Props<TValue> {
  columns: ColumnDef<Campaign, TValue>[];
  data: Campaign[];
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onUpdateStatus?: (
    campaignId: string,
    newStatus: "Active" | "Inactive"
  ) => void;
}

/**
 * Renders a data table for campaigns with sorting, filtering, row selection, and infinite scroll capabilities.
 *
 * @template TValue - The type of data for each row in the table.
 * @param props - The props for the CampaignsDataTable component.
 * @param props.columns - The column definitions for the table.
 * @param props.data - The array of data to display in the table.
 * @param props.isLoading - Indicates if the initial data is loading.
 * @param props.fetchNextPage - Function to fetch the next page of data for infinite scrolling.
 * @param props.hasNextPage - Indicates if there are more pages to fetch.
 * @param props.isFetchingNextPage - Indicates if the next page is currently being fetched.
 * @returns The rendered campaigns data table component.
 */
export function CampaignsDataTable<TValue>({
  columns,
  data,
  isLoading = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props<TValue>) {
    const {
      sorting,
      setSorting,
      rowSelection,
      setRowSelection,
      globalFilter,
      setGlobalFilter,
    } = useCampaignTableStore();

  React.useState<Campaign | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!ref.current) return;
    if (isLoading || isFetchingNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight >= scrollHeight - 60) {
      if (hasNextPage && fetchNextPage) fetchNextPage();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search campaigns..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto rounded-xl shadow-lg bg-white max-h-[520px] pr-2"
      >
        <Table className="min-w-full text-sm md:text-base">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="sticky top-0 bg-white z-10"
                  >
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
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={`s-${i}`} className="animate-pulse">
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-gray-50"
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
    </div>
  );
}
