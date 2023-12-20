import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "../../../course.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";
import { LessonItemPlaceholder } from "./LessonItemPlaceholder";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonNavigationPlaceholder = () => {
  return (
    <Card className="flex-1 max-w-xs">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-40 h-4 " />
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
