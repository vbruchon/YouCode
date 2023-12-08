import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/Typography";
import { MarkdownProse } from "@/components/features/mdx/MarkdownProse";
import Link from "next/link";
import { CourseType } from "./course.query";
import { LessonItem } from "./lessons/[lessonId]/LessonItem";

export type CourseProps = {
  course: CourseType;
};

export const Course = async ({ course }: CourseProps) => {
  return (
    <div>
      <Card className="hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Image
            src={course.img}
            alt={`thumbnails of ${course.name} course`}
            width={120}
            height={120}
          />
          <div className="flex flex-col flex-1 gap-3">
            <CardTitle className="text-3xl">{course.name}</CardTitle>
            <div className="flex flex-row items-center w-full gap-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{course.name[0]}</AvatarFallback>
                {course.creator.image && (
                  <AvatarImage src={course.creator.image} />
                )}
              </Avatar>
              <Typography
                variant={"muted"}
                className="text-md text-muted-foreground"
              >
                {course.creator.name}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MarkdownProse content={course.presentation} />
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {course.lessons.map((lesson) => (
            <Link href={`/courses/${course.id}/lesson/${lesson.id}`}>
              <LessonItem lesson={lesson} />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
