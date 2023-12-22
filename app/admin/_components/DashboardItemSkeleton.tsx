import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode } from 'react'

export const DashboardItemSkeleton = ({
    icon,
    indicator,
}: {
    icon: ReactNode
    indicator: string
}) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                {icon}
                <p>{indicator}</p>
                <Skeleton className=" h-9 w-40" />
            </CardContent>
        </Card>
    )
}
