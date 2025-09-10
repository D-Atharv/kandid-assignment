import { cn } from "@/lib/utils";

interface ActivityIndicatorProps {
  level: number; 
}

/**
 * Renders an activity indicator with four vertical bars, each representing a level of activity.
 * The color of the active bars changes based on the current `level` prop:
 * - Levels 1 and 2: yellow
 * - Level 3: purple
 * - Level 4: blue
 * - Inactive bars: gray
 *
 * @param {ActivityIndicatorProps} props - The props for the ActivityIndicator component.
 * @param {number} props.level - The current activity level (1-4) to display.
 * @returns {JSX.Element} The rendered activity indicator.
 */
export function ActivityIndicator({ level }: ActivityIndicatorProps) {
  const activeColor =
    level <= 2
      ? "bg-yellow-500"
      : level === 3
        ? "bg-purple-500"
        : level === 4
          ? "bg-blue-500"
          : "bg-gray-300";

  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((barLevel) => (
        <span
          key={barLevel}
          className={cn(
            "w-1 bg-gray-300",
            barLevel === 1 && "h-1/4",
            barLevel === 2 && "h-2/4",
            barLevel === 3 && "h-3/4",
            barLevel === 4 && "h-full",
            level >= barLevel && activeColor
          )}
        />
      ))}
    </div>
  );
}