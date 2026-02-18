import MentorCard from "@/components/MentorCard"
import SubjectFilter from "@/components/SubjectFilter"
import SubjectInput from "@/components/SubjectInput"
import { getAllMentors, getBookmarkedMentorIds } from "@/lib/actions/mentor.actions"
import { auth } from "@clerk/nextjs/server"

const MentorsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams
  const subject = filters.subject ? filters.subject : ''
  const topic = filters.topic ? filters.topic : ''

  const { userId } = await auth()
  const mentors = await getAllMentors({ subject, topic })
  const bookmarkedIds = userId ? await getBookmarkedMentorIds(userId) : []
  // console.log('mentors', mentors)
  return (
    <div>
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>Mentors Library</h1>
          <div className="flex gap-4">
            <SubjectInput/>
            <SubjectFilter/>
            </div>
        </section>
        <section className="mentors-grid">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} details={mentor} bookmarked={bookmarkedIds.includes(mentor.id)} />
          ))}
        </section>
      </main>

    </div>
  )
}

export default MentorsLibrary
