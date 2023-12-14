import { prisma } from "@/lib/db/prisma";

export const getAdminLessonDetails = async (
  lessonId: string,
  userId: string
) => {
  return await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      id: true,
      name: true,
      content: true,
      rank: true,
      courseId: true,
      state: true,
    },
  });
};
