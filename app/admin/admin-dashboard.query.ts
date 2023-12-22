import { prisma } from '@/lib/db/prisma'

export const getCountOfUsersEnrolled = async (userId: string) => {
    return await prisma.courseOnUser.count({
        where: {
            course: {
                creatorId: userId,
            },
        },
    })
}

export const getCountOfCourses = async (userId: string) => {
    return await prisma.course.count({
        where: {
            creatorId: userId,
        },
    })
}

export const getCountOfLessons = async (userId: string) => {
    return await prisma.lesson.count({
        where: {
            course: {
                creatorId: userId,
            },
        },
    })
}

//Récupérer les utilisateurs cancelled de la formation
export const getCountUsersCancelled = async () => {
    const usersCancelled = await prisma.course.findMany({
        where: {},
    })
}

//Récupérer les utilisateurs inscrits à une formation il y a moins de 30 jours
export const getNewUsersSince30Days = async (userId: string) => {
    return await prisma.courseOnUser.findMany({
        where: {
            course: {
                creatorId: userId,
            },

            createdAt: {
                // previous 30 days
                gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
            },
        },
        select: {
            createdAt: true,
            canceledAt: true,
            id: true,
        },
    })
}

export const getLatestUserEnrolled = async (userId: string) => {
    const latestUser = await prisma.courseOnUser.findMany({
        where: {
            course: {
                creatorId: userId,
            },
            canceledAt: {
                not: null,
            },
        },
        select: {
            course: {
                select: {
                    id: true,
                    img: true,
                    name: true,
                },
            },
            user: {
                select: {
                    id: true,
                    image: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
    })

    return latestUser[0] // Retourne le dernier utilisateur ou null s'il n'y en a aucun
}
