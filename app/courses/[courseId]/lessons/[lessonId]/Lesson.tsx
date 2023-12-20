import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonType } from "./lesson.query";
import { MDXProse } from "./MDXRemote";

export const Lesson = ({ lesson }: { lesson: LessonType }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <MDXProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
