import { mockLeads } from "@/lib/data";
import { columns } from "./components/columns";
import { LeadsDataTable } from "./components/data-table";

export default async function LeadsPage() {
  const data = mockLeads;

  return (
    <div className="container mx-auto py-10">
      <LeadsDataTable columns={columns} data={data} />
    </div>
  );
}
