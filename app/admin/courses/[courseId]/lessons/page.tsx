import React from "react";
import { getAdminCourseLesson } from "./admin-lessons.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound, redirect, useParams } from "next/navigation";
import { LessonItem } from "./AdminLessonItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";

async function LessonsPage({ params }: { params: { courseId: string } }) {
  const session = await getRequiredAuthSession();
  const course = await getAdminCourseLesson({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons . {course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}/edit`}
              >
                <LessonItem key={lesson.id} lesson={lesson} />
              </Link>
            ))}
            <form>
              <Button
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();
                  const courseId = params.courseId;

                  await prisma.course.findUniqueOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  const lesson = await prisma.lesson.create({
                    data: {
                      name: "New lesson",
                      rank: 8,
                      state: "HIDDEN",
                      courseId: courseId,
                      content: "##Ceci est le cotnenu par défault",
                    },
                  });
                  redirect(
                    `/admin/courses/${courseId}/lessons/${lesson.id}/edit`
                  );
                }}
                type="submit"
              >
                Create lesson
              </Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

export default LessonsPage;
