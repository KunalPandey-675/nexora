import Cta from "@/components/CTA";
import RecentlyCompleted from "@/components/RecentlyCompleted"
import RecentlyCreated from "@/components/RecentlyCreated"
import { getUserMentors, getUserSessions } from "@/lib/actions/mentor.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    const recentSessionMentors = await getUserSessions(userId, 10);

    return (
        <main>
            <Cta />
            <section className="animate-fade-in-up animate-delay-100">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary mb-1">Recent Sessions</h1>
                <p className="text-sm text-text-tertiary mb-4">Pick up where you left off</p>
                <RecentlyCompleted mentors={recentSessionMentors} />
            </section>
        </main >
    )
}

export default Page