import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "../../../course.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";
import { LessonItemPlaceholder } from "./LessonItemPlaceholder";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonNavigationPlaceholder = () => {
  return (
    <Card className="max-w-xs flex-1">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 ">
        {Array.from({ length: 5 }).map((lesson, id) => (
          <LessonItemPlaceholder key={id} />
        ))}
      </CardContent>
    </Card>
  );
};
