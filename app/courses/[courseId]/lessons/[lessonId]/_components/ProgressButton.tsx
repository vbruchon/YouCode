import { Button } from '@/components/ui/button'
import { handleLessonState } from '../lessonId.action'
import { revalidatePath } from 'next/cache'
import { LessonType } from '../lesson.query'
import { CheckCircle, CircleEllipsis } from 'lucide-react'

export type ProgressButtonProps = {
    lesson: LessonType
}

export const ProgressButton = ({ lesson }: ProgressButtonProps) => {
    return (
        <form className="flex gap-4">
            <Button
                type="submit"
                size={'lg'}
                className="bg-orange-600 hover:bg-orange-900"
                formAction={async () => {
                    'use server'

                    await handleLessonState({
                        lessonId: lesson.id,
                        progress: 'INPROGRESS',
                    })
                    revalidatePath(
                        `/courses/${lesson.courseId}/lessons/${lesson.id}`
                    )
                }}
            >
                <CircleEllipsis className="mr-2" size={18} />
                In Progress
            </Button>
            <Button
                type="submit"
                size={'lg'}
                className="bg-green-600 hover:bg-green-900"
                formAction={async () => {
                    'use server'

                    await handleLessonState({
                        lessonId: lesson.id,
                        progress: 'COMPLETED',
                    })
                    revalidatePath(
                        `/courses/${lesson.courseId}/lessons/${lesson.id}`
                    )
                }}
            >
                <CheckCircle className="mr-2" size={18} />
                Mark as completed
            </Button>
        </form>
    )
}
