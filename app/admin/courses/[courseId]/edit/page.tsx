import { NotAuthenticatedCard } from "@/components/features/error/NotAuthentifiedCard";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";
import { prisma } from "@/lib/db/prisma";

export default async function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  if (!session) return <NotAuthenticatedCard />;

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      img: true,
      name: true,
      presentation: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{'"' + course.name + '"'} edit page </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="mt-8 bg-background">
          <CardContent className="p-4">
            <CourseForm defaultValue={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
