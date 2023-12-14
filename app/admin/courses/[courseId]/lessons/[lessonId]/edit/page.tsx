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
import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLessonDetails } from "./lesson.query";

async function LessonIdPAge({ params }: { params: { lessonId: string } }) {
  console.log(params);

  const session = await getRequiredAuthSession();

  const lesson = await getAdminLessonDetails(params.lessonId, session.user.id);

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
