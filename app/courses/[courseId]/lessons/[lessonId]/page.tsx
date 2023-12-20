import { getRequiredAuthSession } from "@/lib/auth";
import { getLesson } from "./lesson.query";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { LessonNavigation } from "./LessonNavigation";
import { Lesson } from "./Lesson";

export default async function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getRequiredAuthSession();
  const lesson = await getLesson(params.lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }
  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      users: {
        where: {
          id: session.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users) {
    return <div>Not Authorized to see this lesson</div>;
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <LessonNavigation courseId={params.courseId} userId={session.user.id} />
      <Lesson lesson={lesson} />
    </div>
  );
}
