import MentorCard from '@/components/MentorCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookPlus } from 'lucide-react'

interface RecentlyCreatedProps {
    mentors: Mentor[]
    bookmarkedIds?: string[]
}

const RecentlyCreated = ({ mentors, bookmarkedIds = [] }: RecentlyCreatedProps) => {
    return (
        <>
            <div className='recentlyCreated flex justify-center w-full border border-border-subtle rounded-2xl p-5 bg-surface-raised shadow-[0_1px_3px_rgba(0,0,0,0.04)]'>
                {mentors.length === 0 ? (
                    <div className='flex flex-col items-center justify-center w-full py-8 gap-3'>
                        <p className='text-text-tertiary text-sm'>No mentors found yet</p>
                        <Link href='/mentor/new-mentor'>
                            <Button className='bg-cta text-white hover:bg-cta/90 rounded-xl shadow-sm transition-all duration-300 text-sm'>
                                <BookPlus size={16} className='mr-1.5' />
                                Create a mentor
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 w-full">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="flex-1 min-w-62.5">
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
