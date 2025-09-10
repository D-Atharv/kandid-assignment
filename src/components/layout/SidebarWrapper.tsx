import { getCurrentUser } from "@/lib/getCurrentUser";
import { Sidebar } from "./Sidebar";

/**
 * Asynchronously fetches the current user and renders the Sidebar component.
 *
 * @param isCollapsed - Determines whether the sidebar should be collapsed.
 * @returns The Sidebar component with the current user and collapsed state.
 */
export default async function SidebarWrapper({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const user = await getCurrentUser();

  return <Sidebar isCollapsed={isCollapsed} user={user} />;
}
