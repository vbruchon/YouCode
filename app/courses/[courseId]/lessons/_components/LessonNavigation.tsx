import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCourse } from '../../course.query'
import { getRequiredAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { LessonItem } from './LessonItem'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LessonNavigationCard from './LessonNavigationCard'

export type LessonNavigationProps = {
    courseId: string
}

export const LessonNavigation = async ({ courseId }: LessonNavigationProps) => {
    const session = await getRequiredAuthSession()
    const course = await getCourse({
        courseId,
        userId: session.user.id,
    })

    if (!course) {
        return notFound()
    }

    return <LessonNavigationCard course={course} />
}
