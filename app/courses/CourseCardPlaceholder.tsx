import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardPlaceholder = () => {
  return (
    <Card className="hover:bg-accent">
      <CardHeader className="flex flex-row gap-3 space-y-0">
        <Avatar>
          <AvatarFallback>
            <Loader size={10} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-3">
          <CardTitle>
            <Skeleton className="h-4 w-80 md:w-60" />
          </CardTitle>
          <div className="flex w-full flex-row-reverse items-center gap-2">
            <Avatar>
              <AvatarFallback>
                <Loader size={10} />
              </AvatarFallback>
            </Avatar>
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
