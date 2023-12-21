import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { AdminLessonItemType } from "./admin-lessons.query";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import Link from "next/link";

export type LessonItemProps = {
  lesson: AdminLessonItemType;
  index: number;
};

export const AdminLessonItem = ({ lesson }: LessonItemProps) => {
  return (
    <div className="flex items-center rounded border border-border bg-card p-6 transition-colors hover:bg-accent">
      <Typography variant="large">{lesson.name}</Typography>
      <Badge className="ml-auto">{lesson.state}</Badge>
    </div>
  );
};

export const AdminLessonItemSortable = ({ lesson, index }: LessonItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    activeIndex,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: index === activeIndex ? 100 : undefined,
  };

  return (
    <Link
      key={lesson.id}
      href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}/edit`}
    >
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="flex items-center gap-x-4 rounded border border-border bg-card p-6 transition-colors hover:bg-accent">
          <Typography variant="large">{lesson.name}</Typography>
          <Badge className="ml-auto">{lesson.state}</Badge>
          <div
            onClickCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Button
              size={"sm"}
              variant={"outline"}
              className="cursor-move"
              {...listeners}
            >
              <Hand />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
