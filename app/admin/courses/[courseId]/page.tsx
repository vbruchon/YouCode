import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { getRequiredAuthSession } from '@/lib/auth'
import React from 'react'
import { getAdminCourse } from './admin-course.query'
import { Typography } from '@/components/ui/Typography'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { CircleUser, User2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { CoursePaginationButton } from '../../../../src/components/features/pagination/PaginationButton'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ActionAcessButton } from './ActionAccessButton'

async function AdminCoursePage({
    params,
    searchParams,
}: {
    params: { courseId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams.page ?? 0)
    const session = await getRequiredAuthSession()
    const course = await getAdminCourse({
        courseId: params.courseId,
        userId: session.user.id,
        userPage: page,
    })

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
                                    <TableHead>status</TableHead>
                                    <TableHead>actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {course.users?.map((user) => (
                                    <TableRow>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarFallback>
                                                    {user.email?.[0]}
                                                </AvatarFallback>
                                                {user.image && (
                                                    <AvatarImage
                                                        src={user.image}
                                                        alt={user.email ?? ''}
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
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {user.canceled
                                                    ? 'Canceled'
                                                    : 'Active'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <ActionAcessButton
                                                courseId={params.courseId}
                                                user={user}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <CoursePaginationButton
                            baseUrl={`/admin/courses/${course.id}`}
                            page={page}
                            totalPage={Math.ceil(
                                (course._count?.users ?? 0) / 5
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="mt-8 flex-1 lg:mt-0">
                    <CardHeader>
                        <div className="flex items-center">
                            {course.img && (
                                <Image
                                    src={course?.img}
                                    alt={course?.name ?? ''}
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
                            <Typography>
                                {course._count?.users} users
                            </Typography>
                            <Typography>
                                {course._count?.lessons} lessons
                            </Typography>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className={buttonVariants({
                                variant: 'outline',
                                size: 'lg',
                            })}
                            href={`/admin/courses/${course.id}/edit`}
                        >
                            Edit
                        </Link>
                        <Link
                            className={buttonVariants({
                                variant: 'outline',
                                size: 'lg',
                            })}
                            href={`/admin/courses/${course.id}/lessons`}
                        >
                            Edit Lessons
                        </Link>
                    </CardFooter>
                </Card>
            </LayoutContent>
        </Layout>
    )
}

export default AdminCoursePage
