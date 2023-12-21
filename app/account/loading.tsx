import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export default async function AccountLoadingPage() {
  return (
    <>
      <Skeleton className="h-12 w-40" />
      <Card className="m-auto mt-4 max-w-lg">
        <CardHeader className="flex flex-col items-center gap-4 space-y-0">
          <Avatar className="mr-4 h-36 w-36 rounded">
            <AvatarFallback>
              <Loader size={16} />
            </AvatarFallback>
          </Avatar>
          <Skeleton className="mb-2 h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      </Card>
    </>
  );
}
