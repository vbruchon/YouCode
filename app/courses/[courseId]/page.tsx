import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "./course.query";
import { Course } from "./Course";

async function CoursePage({ params }: { params: { courseId: string } }) {
  const session = await getRequiredAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course)
    return (
      <Card>
        <CardHeader>
          <CardTitle>There are no lessons online at the moment.</CardTitle>
        </CardHeader>
      </Card>
    );

  return (
    <Layout>
      <LayoutHeader></LayoutHeader>
      <LayoutContent>
        {course && <Course course={course} userId={session.user.id}></Course>}
      </LayoutContent>
    </Layout>
  );
}

export default CoursePage;
