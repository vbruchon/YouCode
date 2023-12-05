"use client"; // Error components must be Client Components

import { LoginButton } from "@/components/features/auth/LoginButton";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="max-w-lg m-auto mt-4">
      <CardHeader>
        <CardTitle>
          You do not have the necessary permissions to access this section{" "}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/account/settings"
        >
          Settings
        </Link>
      </CardFooter>
    </Card>
  );
}
