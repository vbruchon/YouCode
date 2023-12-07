import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import React from "react";
import { getAllCourses } from "./courses.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { NotAuthenticatedCard } from "@/components/features/error/NotAuthentifiedCard";
import { CourseCard } from "./CourseCard";

async function UserCoursesPage() {
  const session = await getRequiredAuthSession();

  if (!session) {
    <NotAuthenticatedCard />;
  }

  const userCourses = await getAllCourses(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>My courses</LayoutTitle>
      </LayoutHeader>
      <LayoutDescription>
        Notre client souhaite avoir la liste de tous les cours qu’il possède et
        qu’il a rejoints.
      </LayoutDescription>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {userCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </LayoutContent>
    </Layout>
  );
}

export default UserCoursesPage;
