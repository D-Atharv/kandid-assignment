"use client";

import { Breadcrumbs } from "./BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sidebar } from "./Sidebar";
import { useSidebarStore } from "@/app/store/use-sidebar-store";

export function Header() {
  const { isOpen, open, close } = useSidebarStore();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet
          open={isOpen}
          onOpenChange={(isOpen) => (isOpen ? open() : close())}
        >
          <Button variant="ghost" size="icon" onClick={open} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <SheetContent side="left" className="p-0 w-64">
            <VisuallyHidden>
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Navigation menu</SheetDescription>
            </VisuallyHidden>
            <Sidebar isCollapsed={false} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs />
    </header>
  );
}
