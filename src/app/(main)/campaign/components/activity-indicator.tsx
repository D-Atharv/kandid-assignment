import { cn } from "@/lib/utils";

/**
 * Renders an activity indicator bar with a color based on the provided activity level.
 *
 * @param level - Optional activity level (default is 0). Determines the color of the indicator:
 *   - 0 or 1: yellow
 *   - 2: orange
 *   - greater than 2: green
 * @returns A React element displaying the colored activity indicator.
 */
export function ActivityIndicator({ level = 0 }: { level?: number }) {
  const color =
    level <= 1
      ? "bg-yellow-400"
      : level === 2
        ? "bg-orange-400"
        : "bg-green-400";
  return (
    <div className="flex items-center gap-1">
      <div className={cn("h-2 w-10 rounded-md bg-gray-100", color)} />
    </div>
  );
}
