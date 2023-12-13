import React from "react";
import { getCourseLessons } from "./lessons.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";
import Link from "next/link";

async function LessonsPage({ params }: { params: { courseId: string } }) {
  const session = await getRequiredAuthSession();
  const course = await getCourseLessons({
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
          <CardContent>
            {course.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/admin/courses/clps7y3df00007utyqzzxprq6/lessons/${lesson.id}/edit`}
              >
                <LessonItem key={lesson.id} lesson={lesson} />
              </Link>
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

export default LessonsPage;
