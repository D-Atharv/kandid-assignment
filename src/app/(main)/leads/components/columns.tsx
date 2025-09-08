"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lead, statusStyles } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ActivityIndicator } from "./activity-indicator";

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Name/Contact" />
    ),
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={lead.avatar.src} alt={lead.name} />
            <AvatarFallback>{lead.avatar.fallback}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{lead.name}</div>
            <div className="text-sm text-muted-foreground">{lead.title}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "campaignName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign Name" />
    ),
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: ({ row }) => <ActivityIndicator level={row.original.activity} />,
    enableSorting: true, 
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const style = statusStyles[status];
      const Icon = style.icon;
      return (
        <Badge variant="outline" className={`h-6 ${style.color}`}>
          <Icon className="h-3 w-3 mr-1.5" />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastContactDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Contact" />
    ),
    cell: ({ row }) => {
      const date = row.original.lastContactDate;
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },
];
