import React, { PropsWithChildren, Suspense } from 'react'
import { LessonNavigationSkeleton } from './_components/LessonNavigationSkeleton'
import { LessonNavigation } from './_components/LessonNavigation'

export default function LessonLayout({
    children,
    params,
}: PropsWithChildren<{ params: { courseId: string } }>) {
    return (
        <div className="relative flex items-start gap-4 p-4">
            <Suspense fallback={<LessonNavigationSkeleton />}>
                <LessonNavigation courseId={params.courseId} />
            </Suspense>
            {children}
        </div>
    )
}
