import RecentlyCompleted from "@/components/RecentlyCompleted"
import RecentlyCreated from "@/components/RecentlyCreated"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getBookmarkedMentors, getBookmarkedMentorIds, getUserMentors, getUserSessions } from "@/lib/actions/mentor.actions"
import { currentUser } from "@clerk/nextjs/server"
import { BookAudio, CircleCheckBig } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"

const Profile = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const mentors = await getUserMentors(user.id)
  const sessionHistory = await getUserSessions(user.id)
  const bookmarkedMentors = await getBookmarkedMentors(user.id)
  const bookmarkedIds = await getBookmarkedMentorIds(user.id)

  return (
    <main className='lg:w-3/4'>
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">

          <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <CircleCheckBig size={17} />
              <p>{sessionHistory.length} </p>
            </div>
            <div>Lessons Completed</div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <BookAudio size={17} />
              <p>{mentors.length} </p>
            </div>
            <div>Mentors Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <RecentlyCompleted mentors={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mentors">
          <AccordionTrigger className="text-2xl font-bold">My Mentors {`(${mentors.length})`}</AccordionTrigger>
          <AccordionContent>
            <RecentlyCompleted mentors={mentors} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">Bookmarked Mentors {`(${bookmarkedMentors.length})`}</AccordionTrigger>
          <AccordionContent>
            <RecentlyCreated mentors={bookmarkedMentors as Mentor[]} bookmarkedIds={bookmarkedIds} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profile
