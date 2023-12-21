'use client'
import { CircleDashed, CircleEllipsis, CheckCircle, Globe } from 'lucide-react'
import { Typography } from '@/components/ui/Typography'
import { CourseLessonItem } from '../../course.query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

export type LessonItemProps = {
    lesson: CourseLessonItem
}

const getLessonIcon = (status: CourseLessonItem['progress']) => {
    if (status === 'COMPLETED') {
        return <CheckCircle size={24} color="#43b812" />
    }
    if (status === 'INPROGRESS') {
        return <CircleEllipsis size={24} color="#e66100" />
    }

    return <CircleDashed size={24} />
}

export const LessonItem = ({ lesson }: LessonItemProps) => {
    const icon = getLessonIcon(lesson.progress)
    const params = useParams()

    const lessonId = String(params?.lessonId)
    const isCurrentLesson = lessonId === lesson.id

    return (
        <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
            <div
                className={cn(
                    'flex items-center rounded border border-border bg-card p-6 transition-all duration-100 ease-in-out hover:bg-accent',
                    {
                        'ml-5 w-full border-gray-500 bg-primary/10':
                            isCurrentLesson,
                    }
                )}
            >
                <div className="mr-4">{icon}</div>
                <Typography variant="small">{lesson.name}</Typography>
                {lesson.state === 'PUBLIC' && (
                    <div title="Public" className="ml-4">
                        <Globe size={16} />
                    </div>
                )}
            </div>
        </Link>
    )
}
