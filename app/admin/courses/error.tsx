"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>Sorry an error occured when fetching your courses</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <button onClick={() => reset()}>Try again</button>
      </CardFooter>
    </Card>
  );
}
