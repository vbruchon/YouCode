import { LessonNavigationSkeleton } from './_components/LessonNavigationSkeleton'
import { LessonSkeleton } from './[lessonId]/_components/LessonSkeleton'

export default async function LessonLoadingPage() {
    return (
        <div className="flex items-start gap-4 p-4">
            <LessonNavigationSkeleton />
            <LessonSkeleton />
        </div>
    )
}
