import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@prisma/client";

export type LessonItemProps = {
  lesson: Lesson;
};

export const LessonItem = (props: LessonItemProps) => {
  return (
    <div className="flex items-center p-6 transition-colors border rounded hover:bg-accent border-border bg-card">
      <Typography variant="large">{props.lesson.name}</Typography>
      <Badge className="ml-auto">{props.lesson.state}</Badge>
    </div>
  );
};
