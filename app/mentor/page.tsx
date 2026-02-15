import MentorCard from "@/components/MentorCard"
import SubjectFilter from "@/components/SubjectFilter"
import SubjectInput from "@/components/SubjectInput"
import { getAllMentors } from "@/lib/actions/mentor.actions"

const MentorsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams
  const subject = filters.subject ? filters.subject : ''
  const topic = filters.topic ? filters.topic : ''

  const mentors = await getAllMentors({ subject, topic })
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
            <MentorCard key={mentor.id} details={mentor}/>
          ))}
        </section>
      </main>

    </div>
  )
}

export default MentorsLibrary
