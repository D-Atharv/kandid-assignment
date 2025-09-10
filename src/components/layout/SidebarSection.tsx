import { cn } from "@/lib/utils";

/**
 * Renders a sidebar section with an optional title and children content.
 *
 * @param title - The title of the section. If empty, the title is not rendered.
 * @param children - The content to display within the section.
 * @param className - Optional additional CSS classes for the section container.
 *
 * @remarks
 * - The section adds a top margin except for the first section.
 * - The title is styled and only rendered if provided.
 * - Children are displayed in a vertical column with spacing.
 */
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
