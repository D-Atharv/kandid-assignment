import { cn } from "@/lib/utils";

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
