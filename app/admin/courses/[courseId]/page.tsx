import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { getCourse } from "./course.query";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { CircleUser, User2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CoursePaginationButton } from "../../../../src/components/features/pagination/PaginationButton";

async function CoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const session = await getRequiredAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Users</CardTitle>
              <CircleUser />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>image</TableHead>
                  <TableHead>email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar>
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? ""}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
                <CoursePaginationButton
                  baseUrl={`/admin/courses/${course.id}`}
                  page={page}
                  totalPage={course._count?.users ?? 0 / 5}
                />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="flex-1 mt-8 lg:mt-0">
          <CardHeader>
            <div className="flex items-center">
              {course.img && (
                <Image
                  src={course?.img}
                  alt={course?.name ?? ""}
                  width={80}
                  height={80}
                  className="mr-6"
                />
              )}
              <CardTitle>{course.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <Typography>{course._count?.users} users</Typography>
              <Typography>{course._count?.lessons} lessons</Typography>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href={`/admin/courses/${course.id}/edit`}
            >
              Edit
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href={`/admin/courses/${course.id}/lessons`}
            >
              Edit Lessons
            </Link>
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

export default CoursePage;

/* 
return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-end">
          {course?. && (
            <Image
              src={course?.img}
              alt={course?.name}
              width={100}
              height={100}
              className="mr-6"
            />
          )}
          {course?.name}
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-wrap items-center gap-6">
        <p>
          Courses created At : {course?.createdAt.toLocaleDateString()}
        </p>
        <Card className="w-1/6">
          <CardContent className="p-4">{users.length} users join</CardContent>
        </Card>
        <Card className="w-1/6">
          <CardContent className="p-4">
            {lessonOnCourse.length} lessons
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );

- Afficher le nombre d'élèves quit on rejoint la formation
- Afficher la date de création de la formation
- Afficher le nombre de lessons de la formation
- Afficher un bouton pour modifier la formation ainsi que les leçons

- Créer un fichier `course.query.ts` pour gérer la query prisma
- Créer un fichier page dans `admin/courses/[coursier]/page.tsx` pour afficher le user
- Utilise le composant Table pour afficher la liste des users
- Utilise les `searchParams` pour gérer les pages
- Ajoute des données de base avec le seed de `Prisma` afin d’avoir un cours à afficher avec des users





<Table>
              <TableHeader>
                <TableHead>Name</TableHead>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
*/
