import { Layout, LayoutContent, LayoutTitle } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { NotAuthenticatedCard } from "@/components/features/error/NotAuthentifiedCard";

export default async function AdminPage() {
  const session = await getRequiredAuthSession();

  if (!session.user) return <NotAuthenticatedCard />;

  return (
    <Layout>
      <LayoutTitle>Admin Page</LayoutTitle>
      <LayoutContent>
        <Card className="mx-auto mt-4 max-w-lg">
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
