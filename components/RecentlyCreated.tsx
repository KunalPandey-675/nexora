import MentorCard from '@/components/MentorCard'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface RecentlyCreatedProps {
    mentors: Mentor[]
}

const RecentlyCreated = ({ mentors }: RecentlyCreatedProps) => {
    return (
        <>
            <h1>Recently Created </h1>
            <div className='recentlyCreated flex justify-center w-full border border-gray-200 rounded-4xl p-4'>
                {mentors.length === 0 ? (
                    <div className=' flex flex-col items-center borde justify-center w-full'>
                        < h2 > No Recently Created Lessons. </h2><Button>Create a mentor now!</Button>
                    </div>
                ) :
                    (<Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full max-w-full"
                    >
                        <CarouselContent>
                            {mentors.map((mentor) => (
                                <CarouselItem key={mentor.id} className="md:basis-1/3 lg:basis-1/4">
                                    <MentorCard details={mentor} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="-right-3.75 h-10 w-10 " />
                        <CarouselPrevious className="-left-3.75 h-10 w-10 " />
                    </Carousel>)
                }

            </div>
        </>

    )
}

export default RecentlyCreated
