import { cn } from "@/lib/utils";

interface ActivityIndicatorProps {
  level: number; 
}

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