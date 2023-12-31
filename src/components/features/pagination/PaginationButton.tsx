'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export type CoursePaginationButtonProps = {
    totalPage: number
    page: number
    baseUrl: string
}

export const CoursePaginationButton = (props: CoursePaginationButtonProps) => {
    const router = useRouter()

    return (
        <div className="mt-2">
            {props.page > 0 && (
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        const searchParams = new URLSearchParams({
                            page: String(props.page - 1),
                        })
                        const url = `${
                            props.baseUrl
                        }?${searchParams.toString()}`
                        router.push(url)
                    }}
                >
                    Previous
                </Button>
            )}

            {props.page < props.totalPage - 1 && (
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        const searchParams = new URLSearchParams({
                            page: String(props.page + 1),
                        })
                        const url = `${
                            props.baseUrl
                        }?${searchParams.toString()}`
                        router.push(url)
                    }}
                >
                    Next
                </Button>
            )}
        </div>
    )
}
