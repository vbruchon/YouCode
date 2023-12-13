import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import React from "react";
import { LessonForm } from "./LessonForm";
import { notFound } from "next/navigation";

async function LessonIdPAge({ params }: { params: { lessonId: string } }) {
  console.log(params);

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
    select: {
      name: true,
      id: true,
      state: true,
      courseId: true,
    },
  });
  if (!lesson) notFound();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit {lesson?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="mt-4">
          <CardContent className="p-4">
            <LessonForm defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

export default LessonIdPAge;
