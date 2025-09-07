"use client";

import * as React from "react";
import { Lead, mockLeads } from "@/lib/data";
import { columns } from "./components/columns";
import { LeadsDataTable } from "./components/data-table";

export default function LeadsPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Lead[]>([]);

  const data_ = mockLeads;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(data_);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [data_]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Leads Dashboard</h1>
      <LeadsDataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
