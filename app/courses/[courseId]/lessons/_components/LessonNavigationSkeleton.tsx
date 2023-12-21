import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LessonItemSkeleton } from './LessonItemSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export const LessonNavigationSkeleton = () => {
    return (
        <Card className="max-w-xs flex-1">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-4 w-40" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 ">
                {Array.from({ length: 5 }).map((lesson, id) => (
                    <LessonItemSkeleton key={id} />
                ))}
            </CardContent>
        </Card>
    )
}
