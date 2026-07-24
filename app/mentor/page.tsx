import MentorCard from "@/components/MentorCard"
import SubjectFilter from "@/components/SubjectFilter"
import SubjectInput from "@/components/SubjectInput"
import { getAllMentors, getBookmarkedMentorIds } from "@/lib/actions/mentor.actions"
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react"
import { MentorLibrarySkeleton } from "@/components/skeletons"

async function MentorGrid({ subject, topic }: { subject?: string | string[]; topic?: string | string[] }) {
  const { userId } = await auth()
  
  // Normalize subject and topic to strings (take first value if array)
  const normalizedSubject = Array.isArray(subject) ? subject[0] : subject
  const normalizedTopic = Array.isArray(topic) ? topic[0] : topic
  
  const mentors = await getAllMentors({ subject: normalizedSubject, topic: normalizedTopic })
  const bookmarkedIds = userId ? await getBookmarkedMentorIds(userId) : []

  return (
    <section className="mentors-grid animate-fade-in-up animate-delay-100">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} details={mentor} bookmarked={bookmarkedIds.includes(mentor.id)} />
      ))}
    </section>
  )
}

const MentorsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams
  const subject = filters.subject ? filters.subject : ''
  const topic = filters.topic ? filters.topic : ''

  return (
    <div>
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Mentor Library</h1>
            <p className="text-sm text-text-tertiary mt-0.5">Browse and discover AI mentors</p>
          </div>
          <div className="flex gap-3">
            <SubjectInput/>
            <SubjectFilter/>
          </div>
        </section>
        <Suspense fallback={<MentorLibrarySkeleton count={6} />}>
          <MentorGrid subject={subject} topic={topic} />
        </Suspense>
      </main>
    </div>
  )
}

export default MentorsLibrary
