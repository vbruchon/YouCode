import { Layout, LayoutContent, LayoutTitle } from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import React from "react";

const useIsAdminUser = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    const user = await prisma.user.findMany({
      where: {
        name: session.user.name,
      },
    });
    if (user[0].isAdmin) {
      return true;
    }
  }
  return false;
};

export default async function AdminPage() {
  const isAdmin = useIsAdminUser();

  if (!isAdmin) {
    throw new Error("You need to be admin for view tihs page");
  }

  return (
    <Layout>
      <LayoutTitle>Admin Page</LayoutTitle>
      <LayoutContent>
        <Card className="max-w-lg m-auto mt-4">
          <Link href="/admin/courses">
            <CardHeader className="flex flex-col items-center gap-4 space-y-0">
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
          </Link>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
