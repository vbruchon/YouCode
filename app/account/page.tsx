import LogOutButton from "@/components/features/auth/LogoutButton";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
const DEFAULT_AVATAR = "/images/defaultAvatar.png";

export default async function AccountPage() {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    throw new Error("You need to be logged to view this page");
  }

  return (
    <>
      <Typography variant="h1" className="my-10 text-center">
        My Account
      </Typography>
      <Card className="max-w-lg m-auto mt-4">
        <CardHeader className="flex flex-col items-center gap-4 space-y-0">
          <Avatar className="mr-4 h-36 w-36">
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            {user.image && (
              <AvatarImage src={user.image} alt={user.name ?? DEFAULT_AVATAR} />
            )}
          </Avatar>
          <CardTitle className="mx-auto">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/account/settings"
          >
            Settings
          </Link>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/admin"
          >
            Admin
          </Link>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <LogOutButton />
        </CardFooter>
      </Card>
    </>
  );
}
