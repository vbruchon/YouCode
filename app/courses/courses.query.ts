import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getAllCourses = async (userId?: string) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      img: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};
export type CoursesCard = Prisma.PromiseReturnType<
  typeof getAllCourses
>[number];
