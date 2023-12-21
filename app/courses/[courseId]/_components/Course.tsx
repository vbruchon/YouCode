import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/Typography'
import { MarkdownProse } from '@/components/features/mdx/MarkdownProse'
import { CourseType } from '../course.query'
import { LessonItem } from '../lessons/_components/LessonItem'
import { Button } from '@/components/ui/button'
import { getRequiredAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type CourseProps = {
    course: CourseType
    userId?: string
}

export const Course = async ({ course, userId }: CourseProps) => {
    const isLogin = Boolean(userId)
    return (
        <div className="flex max-w-3xl gap-4">
            <Card className="w-1/2 hover:bg-accent">
                <CardHeader className="flex flex-row gap-3 space-y-0">
                    <Avatar>
                        <AvatarFallback>{course.name[0]}</AvatarFallback>
                        <AvatarImage
                            src={course.img}
                            alt={`thumbnails of ${course.name} course`}
                            width={120}
                            height={120}
                        />
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-3">
                        <CardTitle className="text-3xl">
                            {course.name}
                        </CardTitle>
                        <div className="flex w-full flex-row items-center gap-2">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                    {course.name[0]}
                                </AvatarFallback>
                                {course.creator.image && (
                                    <AvatarImage src={course.creator.image} />
                                )}
                            </Avatar>
                            <Typography
                                variant={'muted'}
                                className="text-md text-muted-foreground"
                            >
                                {course.creator.name}
                            </Typography>
                        </div>
                    </div>
                    {!course.isCancelled && !course.isEnrolled && isLogin ? (
                        <form>
                            <Button
                                variant={'secondary'}
                                formAction={async () => {
                                    'use server'
                                    const session =
                                        await getRequiredAuthSession()

                                    const courseOnUser =
                                        await prisma.courseOnUser.create({
                                            data: {
                                                userId: session.user.id,
                                                courseId: course.id,
                                            },
                                            select: {
                                                course: {
                                                    select: {
                                                        id: true,
                                                        lessons: {
                                                            orderBy: {
                                                                rank: 'asc',
                                                            },
                                                            select: {
                                                                id: true,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        })
                                    const lesson =
                                        courseOnUser.course.lessons[0]

                                    const existingLessonSubscription =
                                        await prisma.lessonOnUser.findFirst({
                                            where: {
                                                userId: session.user.id,
                                                lessonId: lesson.id,
                                            },
                                        })

                                    if (!existingLessonSubscription) {
                                        await prisma.lessonOnUser.create({
                                            data: {
                                                userId: session.user.id,
                                                lessonId: lesson.id,
                                                progress: 'NOT_STARTED',
                                                createdAt: new Date(),
                                            },
                                        })
                                    }

                                    courseOnUser.course.lessons.map(
                                        async (lesson) => {
                                            await prisma.lessonOnUser.create({
                                                data: {
                                                    userId: session.user.id,
                                                    lessonId: lesson.id,
                                                    progress: 'NOT_STARTED',
                                                    createdAt: new Date(),
                                                },
                                            })
                                        }
                                    )

                                    revalidatePath(`/courses/${course.id}`)

                                    if (!lesson) {
                                        return
                                    }

                                    redirect(
                                        `/courses/${course.id}/lessons/${lesson.id}`
                                    )
                                }}
                            >
                                Join
                            </Button>
                        </form>
                    ) : null}
                </CardHeader>
                <CardContent>
                    <MarkdownProse content={course.presentation} />
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                    {course.lessons.map((lesson) => (
                        <LessonItem lesson={lesson} key={lesson.id} />
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
