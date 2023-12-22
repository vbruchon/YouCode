'use client'

import { Button } from '@/components/ui/button'
import { PanelLeftOpen } from 'lucide-react'
import {
    useLessonNavigationState,
    useLessonNavigationStore,
} from '../lesson-navigation.store'

export const OpenLessonNavigationButton = () => {
    const setState = useLessonNavigationStore((state) => state.setState)
    const state = useLessonNavigationState()

    if (state === 'sticky') return

    return (
        <Button onClick={() => setState('open')} size={'sm'} variant={'ghost'}>
            <PanelLeftOpen />
        </Button>
    )
}
