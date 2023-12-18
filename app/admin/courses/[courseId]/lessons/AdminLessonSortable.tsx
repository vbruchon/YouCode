"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AdminLessonItemSortable } from "./AdminLessonItem";
import { AdminLessonItemType } from "./admin-lessons.query";
import { toast } from "sonner";
import { useState } from "react";
import { saveLessonMove } from "@/action/lesson.action";

type AdminLessonSortableProps = {
  items: AdminLessonItemType[];
};
export const AdminLessonSortable = ({
  items: defaultItems,
}: AdminLessonSortableProps) => {
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      toast.error("Something went wrong");
      return;
    }
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log({ newIndex, newItems });

        const newUpItem = newItems[newIndex - 1]?.rank;
        const newDownItem = newItems[newIndex + 1]?.rank;

        void saveLessonMove({
          upItemRank: newUpItem,
          downItemRank: newDownItem,
          lessonId: String(active.id),
        });
        return newItems;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((lesson, index) => (
          <AdminLessonItemSortable
            index={index}
            key={lesson.id}
            lesson={lesson}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
