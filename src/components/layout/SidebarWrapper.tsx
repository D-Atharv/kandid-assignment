import { getCurrentUser } from "@/lib/getCurrentUser";
import { Sidebar } from "./Sidebar";

export default async function SidebarWrapper({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const user = await getCurrentUser();

  return <Sidebar isCollapsed={isCollapsed} user={user} />;
}
