import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { LessonItemPlaceholder } from "./lessons/[lessonId]/LessonItemPlaceholder";

export const CoursePlaceholder = async () => {
  return (
    <div>
      <Card className="hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar>
            <AvatarFallback>
              <Loader size={16} />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-3">
            <CardTitle className="text-3xl">
              <Skeleton className="h-8 w-80" />
            </CardTitle>
            <div className="flex flex-row items-center w-full gap-2">
              <Avatar>
                <AvatarFallback>
                  <Loader size={10} />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="w-10 h-6" />
            </div>
          </div>
          <Skeleton className="h-9 w-14" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-40 h-9" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-1/2 h-5" />
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 5 }).map((item, i) => (
            <LessonItemPlaceholder key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
