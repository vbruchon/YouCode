import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getCourse = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      img: true,
      name: true,
      presentation: true,
      lessons: {
        where: {
          state: {
            in: ["PUBLIC", "PUBLISHED"],
          },
        },
        select: {
          id: true,
          name: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
          rank: true,
        },
        orderBy: {
          rank: "asc",
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          lessons: true,
        },
      },
    },
  });

  if (!course) return null;

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    lessons,
  };
};

export type CourseType = NonNullable<
  Prisma.PromiseReturnType<typeof getCourse>
>;
export type CourseLessonItem = CourseType["lessons"][0];
