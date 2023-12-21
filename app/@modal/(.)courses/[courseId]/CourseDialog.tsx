'use client'
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
} from '@/components/ui/dialog'
import { usePathname, useRouter } from 'next/navigation'
import { CourseType } from '../../../courses/[courseId]/course.query'
import { LessonItem } from '../../../courses/[courseId]/lessons/_components/LessonItem'
import { PropsWithChildren } from 'react'

export type CourseDialogProps = PropsWithChildren<{
    course: CourseType
}>

export const CourseDialog = ({ course, children }: CourseDialogProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const isCoursePath =
        pathName?.split('/').filter(Boolean).length === 2 &&
        pathName.split('/').filter((segment) => segment === 'courses')
            .length === 1

    return (
        <Dialog
            open={isCoursePath}
            onOpenChange={() => {
                router.back()
            }}
        >
            <DialogContent className="max-h-screen max-w-3xl overflow-auto">
                <DialogHeader>
                    <DialogTitle>{course.name}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
