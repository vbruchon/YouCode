"use server";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { LessonFormSchema } from "../schema/lesson.shema";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { Course } from "../../app/courses/[courseId]/_components/Course";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";

const LessonActionEditSchema = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  data: LessonFormSchema,
});

const SaveLessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
});

export const lessonActionEdit = authentificatedAction(
  LessonActionEditSchema,
  async (props) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        courseId: props.courseId,
      },
      data: props.data,
    });
    return { message: "Lesson update successfully", lesson };
  }
);

export const saveLessonMove = authentificatedAction(
  SaveLessonMoveSchema,
  async (data, { userId }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: data.lessonId,
          },
        },
        creatorId: userId,
      },
    });

    if (!course) {
      throw new ServerError("This course donesn't exist");
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: data.lessonId,
        courseId: course.id,
      },
    });

    if (!lesson) {
      throw new ServerError("This lesson doesn't exist");
    }
    const newRank = getTheMiddleRank(data.upItemRank, data.downItemRank);

    await prisma.lesson.update({
      where: { id: data.lessonId },
      data: { rank: newRank },
    });

    return "ok";
  }
);
