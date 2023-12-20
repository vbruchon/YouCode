import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "../../../course.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";

export type LessonNavigationProps = {
  courseId: string;
  userId: string;
};

export const LessonNavigation = async ({
  courseId,
  userId,
}: LessonNavigationProps) => {
  const session = await getRequiredAuthSession();
  const course = await getCourse({
    courseId,
    userId,
  });
  const lessons = course?.lessons;

  if (!lessons) {
    return notFound();
  }

  return (
    <Card className="flex-1 max-w-xs">
      <CardHeader>
        <CardTitle>Lessons Navigation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 ">
        {lessons.map((lesson) => (
          <LessonItem lesson={lesson} />
        ))}
      </CardContent>
    </Card>
  );
};
