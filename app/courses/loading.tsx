import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import React from "react";
import { CourseCardPlaceholder } from "./CourseCardPlaceholder";

export default function UserCoursesLoadingPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>My courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {Array.from({ length: 8 }).map((item, id) => (
          <CourseCardPlaceholder key={id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
