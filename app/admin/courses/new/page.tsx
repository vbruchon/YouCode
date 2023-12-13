import { NotAuthenticatedCard } from "@/components/features/error/NotAuthentifiedCard";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function EditCoursePage() {
  const session = await getRequiredAuthSession();

  if (!session) return <NotAuthenticatedCard />;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Create course </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="mt-8 bg-background">
          <CardContent className="p-4">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
