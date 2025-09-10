import { Header } from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/SidebarWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block w-64 shrink-0 bg-muted/40 p-2">
        <SidebarWrapper isCollapsed={false}/>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>
    </div>
  );
}
