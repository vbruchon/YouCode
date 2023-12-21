import { CircleDashed } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const LessonItemSkeleton = () => {
    return (
        <div
            className={cn(
                'flex items-center rounded p-6',
                'border border-border bg-card transition-colors hover:bg-accent'
            )}
        >
            <CircleDashed size={16} />
            <Skeleton className="mr-5 h-8 w-2/4" />
        </div>
    )
}
