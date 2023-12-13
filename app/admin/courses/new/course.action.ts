"use server";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { CourseFormSchema } from "./course.schema";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

export const courseActionCreate = authentificatedAction(
  CourseFormSchema,
  async (props, { userId }) => {
    const course = await prisma.course.create({
      data: {
        ...props,
        creatorId: userId,
      },
    });
    return { message: "Course create successfully", course };
  }
);
