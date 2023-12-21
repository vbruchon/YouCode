import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonPlaceholder = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-40 md:w-60" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="h-32 w-3/4" />
        <Skeleton className="my-5 h-40 w-1/3" />
        <Skeleton className="my-5 h-28 w-3/4" />
      </CardContent>
    </Card>
  );
};
