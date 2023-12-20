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
      <Skeleton className="w-40 h-12" />
      <Card className="max-w-lg m-auto mt-4">
        <CardHeader className="flex flex-col items-center gap-4 space-y-0">
          <Avatar className="mr-4 rounded h-36 w-36">
            <AvatarFallback>
              <Loader size={16} />
            </AvatarFallback>
          </Avatar>
          <Skeleton className="w-32 h-5 mb-2" />
          <Skeleton className="w-32 h-5" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      </Card>
    </>
  );
}
