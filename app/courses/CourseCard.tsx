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
          <Avatar className="rounded h-14 w-14">
            <AvatarFallback>{props.course.name[0]}</AvatarFallback>
            {props.course.img && <AvatarImage src={props.course.img} />}
          </Avatar>
          <div className="flex flex-col flex-1 gap-3">
            <CardTitle>{props.course.name}</CardTitle>
            <div className="flex flex-row-reverse items-center w-full gap-2">
              <Avatar className="w-8 h-8">
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

/* 


<Card className="transition-colors hover:bg-accent">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="rounded">
                      <AvatarFallback>{course.name[0]}</AvatarFallback>
                      {course.img && (
                        <AvatarImage
                          src={course.img}
                          alt={course.name}
                          width={200}
                          height={200}
                        />
                      )}
                    </Avatar>
                    <CardTitle>{course.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Typography>{course.presentation}</Typography>
                  <Typography>{author?.name}</Typography>
                </CardContent>
              </Card>*/
