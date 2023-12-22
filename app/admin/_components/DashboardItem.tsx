import { Card, CardContent } from '@/components/ui/card'
import { CircleUserRound, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

type DashboardItemProps = {
    icon: ReactNode
    indicator: string
    data: number
}

export const DashboardItem = async ({
    icon,
    indicator,
    data,
}: DashboardItemProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return (
        <Card className="">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                {icon}
                <p>{indicator}</p>
                <span className=" text-3xl font-bold text-primary">{data}</span>
            </CardContent>
        </Card>
    )
}
