import { CircleDashed, CircleEllipsis, CheckCircle } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { CourseLessonItem } from "../../course.query";

export type LessonItemProps = {
  lesson: CourseLessonItem;
};

const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "COMPLETED") {
    return <CheckCircle size={24} color="#43b812" />;
  }
  if (status === "INPROGRESS") {
    return <CircleEllipsis size={24} color="#e66100" />;
  }

  return <CircleDashed size={24} />;
};

export const LessonItem = ({ lesson }: LessonItemProps) => {
  const icon = getLessonIcon(lesson.progress);

  return (
    <div className="flex items-center p-6 transition-colors border rounded hover:bg-accent border-border bg-card">
      <div className="mr-4">{icon}</div>
      <Typography variant="large">{lesson.name}</Typography>
    </div>
  );
};
