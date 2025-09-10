import { Header } from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/SidebarWrapper";

/**
 * MainLayout component that structures the main page layout.
 *
 * @param children - The React node(s) to be rendered as the main content.
 * @returns A layout with a sidebar (visible on desktop), header, and main content area.
 *
 * @remarks
 * - The sidebar is only visible on medium screens and above (`md:block`).
 * - The header is displayed above the main content.
 * - The main content area receives the `children` prop.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block w-64 shrink-0 bg-muted/40 p-2">
        <SidebarWrapper isCollapsed={false} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>
    </div>
  );
}
