import { getRequiredAuthSession } from "@/lib/auth";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "../../../courses/[courseId]/course.query";
import { CourseDialog } from "./CourseDialog";
import { Course } from "../../../courses/[courseId]/Course";

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
    <CourseDialog course={course}>
      <Course course={course} userId={session.user.id} />
    </CourseDialog>
  );
}

export default CoursePage;
