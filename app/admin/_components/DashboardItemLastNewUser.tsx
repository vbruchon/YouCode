import { Typography } from '@/components/ui/Typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

type DashboardItemLastNewUserProps = {
    id: string
    email: string | null
    image: string | null
}

type DashboardItemLastNewUserContainerProps = {
    lastUser: {
        user: DashboardItemLastNewUserProps
        course: {
            id: string
            img: string
            name: string
        }
    }
}

export const DashboardItemLastNewUser = async ({
    lastUser: { user, course },
}: DashboardItemLastNewUserContainerProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last user enrolled</CardTitle>
            </CardHeader>
            <CardContent className="m-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User image</TableHead>
                            <TableHead>User name</TableHead>
                            <TableHead>Course image</TableHead>
                            <TableHead>Course name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Avatar>
                                    <AvatarFallback>
                                        {user.email?.[0]}
                                    </AvatarFallback>
                                    {user.image && (
                                        <AvatarImage
                                            src={user.image}
                                            width={32}
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
                                <Avatar>
                                    <AvatarFallback>
                                        {course.name?.[0]}
                                    </AvatarFallback>
                                    {course.img && (
                                        <AvatarImage
                                            src={course.img}
                                            width={32}
                                        />
                                    )}
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    as={Link}
                                    variant="large"
                                    href={`/admin/users/${course.id}`}
                                >
                                    {course.name}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
