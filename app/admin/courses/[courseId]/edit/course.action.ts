"use server";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { CourseFormSchema } from "./course.schema";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});
export const courseActionEdit = authentificatedAction(
  CourseActionEditProps,
  async (props, { userId }) => {
    await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });
    return "Course update successfully";
  }
);
