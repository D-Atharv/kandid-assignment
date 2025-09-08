"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Campaign, campaignStatusStyles } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign Name" />
    ),
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex flex-col">
          <div className="font-medium">{c.name}</div>
          <div className="text-sm text-muted-foreground">{c.description}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      const style = campaignStatusStyles[s];
      const Icon = style.icon;
      return (
        <Badge className={`h-6 ${style.className} border-none font-medium`}>
          <Icon className="h-3 w-3 mr-1.5" />
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalLeads",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Leads" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.original.totalLeads}</span>
      </div>
    ),
  },
  {
    id: "requestStatus",
    header: "Request Status",
    cell: ({ row }) => {
      const rs = row.original.requestStatus;
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">{rs.success}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{rs.pending}</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm">{rs.failed}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "connectionStatus",
    header: "Connection Status",
    cell: ({ row }) => {
      const cs = row.original.connectionStatus;
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{cs.connected}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{cs.invited}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
];
