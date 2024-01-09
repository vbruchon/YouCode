import { Layout } from '@/components/layout/layout'
import { Typography } from '@/components/ui/Typography'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
    return (
        <Layout>
            <div className="mx-auto max-w-screen-xl p-8">
                {/* Hero Section */}
                <div className="mb-12 flex h-screen flex-col items-center justify-center lg:flex-row">
                    <div className="lg:w-2/3">
                        <Typography
                            variant="h1"
                            className="mb-4 text-center text-4xl font-bold lg:text-left"
                        >
                            JustCode
                        </Typography>
                        <Typography
                            variant="base"
                            className="text-center lg:text-left"
                        >
                            Dive deep into the world of coding with personalized
                            and interactive courses curated just for you.
                        </Typography>
                        <Typography
                            variant="base"
                            className="mt-4 text-center lg:text-left"
                        >
                            Created by developers, for developers: JustCode was
                            born to make learning to code easy and fun.
                        </Typography>

                        {/* Start Learning CTA */}
                        <div className="mt-8 flex items-center justify-center">
                            <Button>Start learning with JustCode</Button>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0 lg:w-1/2">
                        <Image
                            src="/images/hero.png"
                            alt="A person who studies"
                            width={800}
                            height={600}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Modern Course Navigations Section */}
                {/* <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Modern Course Navigations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Your course navigation elements go here }
                    </CardContent>
                </Card>
 */}
            </div>
        </Layout>
    )
}
