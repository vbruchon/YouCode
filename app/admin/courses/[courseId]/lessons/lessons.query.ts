import { prisma } from "@/lib/db/prisma";
import { getCourse } from "../course.query";
import { $Enums } from "@prisma/client";

export const getCourseLessons = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  return await prisma.course.findFirst({
    where: { id: courseId, creatorId: userId },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });
};
