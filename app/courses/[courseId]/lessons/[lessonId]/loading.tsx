import { getRequiredAuthSession } from "@/lib/auth";
import { getLesson } from "./lesson.query";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { LessonNavigation } from "./_components/LessonNavigation";
import { Lesson } from "./_components/Lesson";
import { LessonNavigationPlaceholder } from "./_components/LessonNavigationPlaceholder";
import { LessonPlaceholder } from "./_components/LessonPlaceHolder";

export default async function LessonLoadingPage() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonNavigationPlaceholder />
      <LessonPlaceholder />
    </div>
  );
}
