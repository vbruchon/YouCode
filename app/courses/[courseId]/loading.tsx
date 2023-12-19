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
import { CoursePlaceholder } from "./CoursePlaceholder";

export default async function CoursePageLoader() {
  return (
    <Layout>
      <LayoutHeader></LayoutHeader>
      <LayoutContent>
        <CoursePlaceholder />
      </LayoutContent>
    </Layout>
  );
}
