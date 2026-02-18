import MentorCard from '@/components/MentorCard'
import { Button } from '@/components/ui/button'

interface RecentlyCreatedProps {
    mentors: Mentor[]
    bookmarkedIds?: string[]
}

const RecentlyCreated = ({ mentors, bookmarkedIds = [] }: RecentlyCreatedProps) => {
    return (
        <>
            <div className='recentlyCreated flex justify-center w-full border border-gray-200 rounded-4xl p-4'>
                {mentors.length === 0 ? (
                    <div className=' flex flex-col items-center justify-center w-full'>
                        <h2>No Recently Created Lessons.</h2>
                        <Button>Create a mentor now!</Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 w-full">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="flex-1 min-w-[250px]">
                                <MentorCard details={mentor} bookmarked={bookmarkedIds.includes(mentor.id)} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default RecentlyCreated
