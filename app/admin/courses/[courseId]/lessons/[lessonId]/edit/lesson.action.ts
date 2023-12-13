"use server";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { LessonFormSchema } from "./lesson.shema";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const LessonActionEditProps = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  data: LessonFormSchema,
});
export const lessonActionEdit = authentificatedAction(
  LessonActionEditProps,
  async (props) => {
    await prisma.lesson.update({
      where: {
        id: props.lessonId,
        courseId: props.courseId,
      },
      data: props.data,
    });
    return "Lesson update successfully";
  }
);
