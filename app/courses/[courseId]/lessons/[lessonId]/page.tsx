import { getRequiredAuthSession } from '@/lib/auth'
import { getLesson } from './lesson.query'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { MDXProse } from './_components/MDXRemote'
import { ProgressButton } from './_components/ProgressButton'
import { OpenLessonNavigationButton } from '../_components/OpenLessonNavigationButton'

export default async function LessonPage({
    params: { courseId, lessonId },
}: {
    params: { courseId: string; lessonId: string }
}) {
    const session = await getRequiredAuthSession()
    const lesson = await getLesson(lessonId, session.user.id)

    if (!lesson) {
        notFound()
    }
    const isAuthorized = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
        select: {
            users: {
                where: {
                    id: session.user.id ?? '-',
                    canceledAt: null,
                },
            },
        },
    })

    if (lesson.state !== 'PUBLIC' && !isAuthorized?.users) {
        return <div>Not Authorized to see this lesson</div>
    }

    return (
        <Card className="flex-1">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
                <OpenLessonNavigationButton />
                <CardTitle>{lesson.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <MDXProse markdown={lesson.content} />
            </CardContent>
            <CardFooter className="flex max-w-7xl flex-row-reverse p-6">
                <ProgressButton lesson={lesson} />
            </CardFooter>
        </Card>
    )
}
