import { cn } from "@/lib/utils";

export function SidebarSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 first:mt-0", className)}>
      {/* Render title only if it's not empty (for collapsed state) */}
      {title && (
        <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
