import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonPlaceholder = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-40 h-8 md:w-60" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="w-3/4 h-32" />
        <Skeleton className="w-1/3 h-40 my-5" />
        <Skeleton className="w-3/4 my-5 h-28" />
      </CardContent>
    </Card>
  );
};
