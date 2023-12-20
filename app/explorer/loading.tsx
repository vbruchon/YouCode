import React from "react";
import { CourseCardPlaceholder } from "../courses/CourseCardPlaceholder";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";

export default function ExplorerLoadingPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {Array.from({ length: 8 }).map((item, id) => (
          <CourseCardPlaceholder key={id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
