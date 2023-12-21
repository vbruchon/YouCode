import { authentificatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const handleLessonState = authentificatedAction(
  z.object({
    lessonId: z.string(),
    progress: z.enum(["INPROGRESS", "COMPLETED"]),
  }),
  async ({ lessonId, progress }, { userId }) => {
    const updatedLessonOnUser = await prisma.lessonOnUser.update({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      data: {
        progress,
      },
      select: {
        lesson: {
          select: {
            id: true,
            rank: true,
            courseId: true,
          },
        },
      },
    });

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        courseId: updatedLessonOnUser.lesson.courseId,
        rank: {
          gt: updatedLessonOnUser.lesson.rank,
        },
      },
      orderBy: {
        rank: "asc",
      },
    });

    revalidatePath(
      `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${lessonId}`
    );

    if (!nextLesson) {
      return;
    }
    redirect(
      `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${nextLesson.id}`
    );
  }
);
