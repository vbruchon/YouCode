import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCourse } from '../../course.query'
import { getRequiredAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { LessonItem } from './LessonItem'

export type LessonNavigationProps = {
    courseId: string
}

export const LessonNavigation = async ({ courseId }: LessonNavigationProps) => {
    const session = await getRequiredAuthSession()
    const course = await getCourse({
        courseId,
        userId: session.user.id,
    })
    const lessons = course?.lessons

    if (!lessons) {
        return notFound()
    }

    return (
        <Card className="max-w-xs flex-1">
            <CardHeader>
                <CardTitle>Lessons Navigation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 ">
                {lessons.map((lesson) => (
                    <LessonItem lesson={lesson} key={lesson.id} />
                ))}
            </CardContent>
        </Card>
    )
}
