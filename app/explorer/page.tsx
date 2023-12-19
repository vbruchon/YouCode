import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import Link from "next/link";
import React from "react";
import { CourseCard } from "../courses/CourseCard";
import { getAllCourses } from "../courses/courses.query";

async function ExplorerPage() {
  const courses = await getAllCourses();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </LayoutContent>
    </Layout>
  );
}

export default ExplorerPage;
