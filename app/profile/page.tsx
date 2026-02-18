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
      <section className="flex justify-between gap-6 max-sm:flex-col items-center animate-fade-in-up">
        <div className="flex gap-4 items-center">
          <Image 
            src={user.imageUrl} 
            alt={user.firstName!} 
            width={96} 
            height={96} 
            className="rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border-subtle" 
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl tracking-tight text-text-primary">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-text-tertiary">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border border-border-subtle rounded-2xl p-4 gap-2 flex flex-col h-fit bg-surface-raised shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-w-30">
            <div className="flex gap-2 items-center text-accent-blue">
              <CircleCheckBig size={16} />
              <p className="text-xl font-bold text-text-primary">{sessionHistory.length}</p>
            </div>
            <div className="text-xs text-text-tertiary font-medium">Completed</div>
          </div>
          <div className="border border-border-subtle rounded-2xl p-4 gap-2 flex flex-col h-fit bg-surface-raised shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-w-30">
            <div className="flex gap-2 items-center text-cta-gold">
              <BookAudio size={16} />
              <p className="text-xl font-bold text-text-primary">{mentors.length}</p>
            </div>
            <div className="text-xs text-text-tertiary font-medium">Mentors</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple" className="animate-fade-in-up animate-delay-200">
        <AccordionItem value="recent" className="border-border-subtle">
          <AccordionTrigger className="text-xl font-semibold text-text-primary hover:no-underline">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <RecentlyCompleted mentors={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mentors" className="border-border-subtle">
          <AccordionTrigger className="text-xl font-semibold text-text-primary hover:no-underline">My Mentors {`(${mentors.length})`}</AccordionTrigger>
          <AccordionContent>
            <RecentlyCompleted mentors={mentors} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bookmarks" className="border-border-subtle">
          <AccordionTrigger className="text-xl font-semibold text-text-primary hover:no-underline">Bookmarked Mentors {`(${bookmarkedMentors.length})`}</AccordionTrigger>
          <AccordionContent>
            <RecentlyCreated mentors={bookmarkedMentors as Mentor[]} bookmarkedIds={bookmarkedIds} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profile
