import { Card, CardContent } from '@/components/ui/card'
import { Book, BookOpenText, CircleUserRound } from 'lucide-react'
import { DashboardItem } from './DashboardItem'
import { getRequiredAuthSession } from '@/lib/auth'
import {
    getCountOfCourses,
    getCountOfLessons,
    getCountOfUsersEnrolled,
    getLatestUserEnrolled,
} from '../admin-dashboard.query'
import { Suspense } from 'react'
import { DashboardItemSkeleton } from './DashboardItemSkeleton'
import { DashboardItemLastNewUser } from './DashboardItemLastNewUser'
import { DashboardItemLastNewUserSkeleton } from './DashboardItemLastNewUserSkeleton'

export const Dashboard = async () => {
    const session = await getRequiredAuthSession()
    const totalUsersEnrolled = await getCountOfUsersEnrolled(session.user.id)
    const totalCourses = await getCountOfCourses(session.user.id)
    const totalLessons = await getCountOfLessons(session.user.id)
    const latestUserEnrolled = await getLatestUserEnrolled(session.user.id)

    return (
        <>
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Suspense
                    fallback={
                        <DashboardItemSkeleton
                            icon={<CircleUserRound size={40} />}
                            indicator="users enrolled"
                        />
                    }
                >
                    <DashboardItem
                        icon={<CircleUserRound size={40} />}
                        indicator="users enrolled"
                        data={totalUsersEnrolled}
                    />
                </Suspense>
                <Suspense
                    fallback={
                        <DashboardItemSkeleton
                            icon={<Book size={40} />}
                            indicator="courses created"
                        />
                    }
                >
                    <DashboardItem
                        icon={<Book size={40} />}
                        indicator="courses created"
                        data={totalCourses}
                    />
                </Suspense>
                <Suspense
                    fallback={
                        <DashboardItemSkeleton
                            icon={<BookOpenText size={40} />}
                            indicator="lessons created"
                        />
                    }
                >
                    <DashboardItem
                        icon={<BookOpenText size={40} />}
                        indicator="lessons created"
                        data={totalLessons}
                    />
                </Suspense>
            </div>
            <Suspense fallback={<DashboardItemLastNewUserSkeleton />}>
                <DashboardItemLastNewUser lastUser={latestUserEnrolled} />
            </Suspense>
        </>
    )
}
