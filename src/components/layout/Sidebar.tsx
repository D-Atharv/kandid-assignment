"use client";

import {
  LayoutDashboard,
  Users,
  Megaphone,
  MessageSquare,
  Linkedin,
  Settings,
  Activity,
  UserCircle,
  ChevronDown,
  Headphones,
  Moon,
  MessageCircle as MessageIcon,
  RotateCw,
  Package, // Added for logo
} from "lucide-react";
import { SidebarSection } from "./SidebarSection";
import { SidebarLink } from "./SidebarLink";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SidebarProps {
  isCollapsed: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  user?: { name: string; email: string } | null;
}

export function Sidebar({ isCollapsed, user }: SidebarProps) {
  return (
    // This is the "floating card" with its own background and border
    <div className="flex h-full flex-col rounded-lg border bg-background">
      {/* Top Section: Branding + Profile */}
      <div className="p-4">
        {!isCollapsed ? (
          <>
            <div className="mb-4 flex items-center justify-center font-bold">
              <Package className="h-9 w-9 text-primary" color="blue" />
              <span className=" text-2xl">
                Link
                <span className="font-medium text-blue-700">
                  B<span className="text-blue-500">ir</span>d
                </span>
              </span>
            </div>
            <div className="flex cursor-pointer items-center gap-2 border-t p-2 text-primary">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="#" alt="Avatar" />
                <AvatarFallback>PE</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Kandid</div>
                <div className="text-xs text-muted-foreground">Personal</div>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-4">
            <Package className="h-7 w-7 text-primary" />
          </div>
        )}
      </div>

      {/* Nav Sections - Takes up remaining space */}
      <ScrollArea className="flex-1">
        <div className="px-4">
          <SidebarSection title={isCollapsed ? "" : "Overview"}>
            <SidebarLink
              href="/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/leads"
              icon={Users}
              label="Leads"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/campaign"
              icon={Megaphone}
              label="Campaign"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/messages"
              icon={MessageSquare}
              label="Messages"
              badge="10+"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/linkedin-accounts"
              icon={Linkedin}
              label="LinkedIn Accounts"
              isCollapsed={isCollapsed}
            />
          </SidebarSection>

          <SidebarSection title={isCollapsed ? "" : "Settings"}>
            <SidebarLink
              href="/settings"
              icon={Settings}
              label="Setting & Billing"
              isCollapsed={isCollapsed}
            />
          </SidebarSection>

          <SidebarSection title={isCollapsed ? "" : "Admin Panel"}>
            <SidebarLink
              href="/activity"
              icon={Activity}
              label="Activity logs"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/users"
              icon={UserCircle}
              label="User logs"
              isCollapsed={isCollapsed}
            />
          </SidebarSection>
        </div>
      </ScrollArea>

      {/* Bottom Section: Pushed to the bottom */}
      <div className="mt-auto">
        {!isCollapsed && (
          <div className="border-t border-transparent p-4">
            <div className="mb-4 flex items-center justify-between gap-4 px-4 pb-6">
              <MessageIcon className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
              <Headphones className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
              <Moon className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
              <Moon className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
            </div>
            <div className="flex items-center gap-3 rounded-lg">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="#" alt="User Avatar" />
                <AvatarFallback className="font-bold">BK</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="truncate font-semibold">
                  {user?.name || user?.email || "Guest"}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {user?.email || "Guest"}
                </div>
              </div>
              <RotateCw className="h-4 w-4 cursor-pointer text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
