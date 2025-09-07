"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import the Badge component
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarLink({
  href,
  icon: Icon,
  label,
  isCollapsed,
  badge, // Add badge to props
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  badge?: string | number; // Make it optional
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-center"
                size="icon"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link href={href} className="block">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start text-left"
      >
        <Icon className="mr-3 h-5 w-5 shrink-0" />
        <span className="flex-grow">{label}</span>
        {badge && (
          <Badge variant="secondary" className="ml-auto text-[10px] px-1.5">
            {badge}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
