import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursesCard } from "./courses.query";
import Link from "next/link";

export type CourseCardProps = {
  course: CoursesCard;
};

export const CourseCard = (props: CourseCardProps) => {
  return (
    <Link href={`/courses/${props.course.id}`}>
      <Card className="hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="h-14 w-14 rounded">
            <AvatarFallback>{props.course.name[0]}</AvatarFallback>
            {props.course.img && <AvatarImage src={props.course.img} />}
          </Avatar>
          <div className="flex flex-1 flex-col gap-3">
            <CardTitle>{props.course.name}</CardTitle>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{props.course.name[0]}</AvatarFallback>
                {props.course.creator.image && (
                  <AvatarImage src={props.course.creator.image} />
                )}
              </Avatar>
              <Typography variant={"muted"} className="text-muted-foreground">
                {props.course.creator.name}
              </Typography>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
