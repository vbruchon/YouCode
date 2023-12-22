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
import { Skeleton } from '@/components/ui/skeleton'

export const DashboardItemLastNewUserSkeleton = () => {
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
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-28" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-28" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
