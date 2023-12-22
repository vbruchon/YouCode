'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LessonItem } from './LessonItem'
import { CourseType } from '../../course.query'
import {
    useLessonNavigationState,
    useLessonNavigationStore,
} from '../lesson-navigation.store'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

export default function LessonNavigationCard({
    course,
}: {
    course: CourseType
}) {
    const setState = useLessonNavigationStore((state) => state.setState)
    const state = useLessonNavigationState()

    if (state === 'sticky') {
        return (
            <Card className="max-w-xs flex-1">
                <CardHeader className="flex-row items-center justify-between space-y-0">
                    <CardTitle>{course.name}</CardTitle>
                    <Button
                        onClick={() => setState('close')}
                        variant={'ghost'}
                        size={'sm'}
                    >
                        <PanelLeftClose />
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 ">
                    {course.lessons.map((lesson) => (
                        <LessonItem lesson={lesson} key={lesson.id} />
                    ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <Sheet open={state === 'open'} onOpenChange={() => setState('close')}>
            <SheetContent side={'left'}>
                <SheetHeader className="flex-row items-center gap-4 space-y-0">
                    <SheetTitle>{course.name}</SheetTitle>
                    <Button
                        onClick={() => setState('sticky')}
                        variant={'ghost'}
                        size={'sm'}
                        className="hidden lg:block"
                    >
                        <PanelLeftOpen />
                    </Button>
                </SheetHeader>
                <ul
                    className="my-8 flex flex-col gap-2"
                    onClick={() => {
                        setState('close')
                    }}
                >
                    {course.lessons.map((lesson) => (
                        <LessonItem lesson={lesson} key={lesson.id} />
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    )
}
