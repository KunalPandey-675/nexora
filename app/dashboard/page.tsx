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
            <h1>Recent Sessions</h1>
            <RecentlyCompleted mentors={recentSessionMentors} />
        </main >
    )
}

export default Page