import { CircleDashed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const LessonItemPlaceholder = () => {
  return (
    <div
      className={cn(
        "flex items-center p-6 rounded",
        "border border-border bg-card transition-colors hover:bg-accent"
      )}
    >
      <CircleDashed size={16} />
      <Skeleton className="w-2/4 h-8 mr-5" />
    </div>
  );
};
