import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Loader } from '@/components/ui/loader'
import { Skeleton } from '@/components/ui/skeleton'
import { LessonItemSkeleton } from '../lessons/_components/LessonItemSkeleton'

export const CoursePlaceholder = async () => {
    return (
        <div>
            <Card className="hover:bg-accent">
                <CardHeader className="flex flex-row gap-3 space-y-0">
                    <Avatar>
                        <AvatarFallback>
                            <Loader size={16} />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-3">
                        <CardTitle className="text-3xl">
                            <Skeleton className="h-8 w-80" />
                        </CardTitle>
                        <div className="flex w-full flex-row items-center gap-2">
                            <Avatar>
                                <AvatarFallback>
                                    <Loader size={10} />
                                </AvatarFallback>
                            </Avatar>
                            <Skeleton className="h-6 w-10" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-14" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/2" />
                </CardContent>
            </Card>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                    {Array.from({ length: 5 }).map((item, i) => (
                        <LessonItemSkeleton key={i} />
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
