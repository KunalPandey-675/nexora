import { getMentor } from "@/lib/actions/mentor.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MentorComponent from "@/components/MentorComponent";

interface MentorSessionPageProps {
  params: Promise<{ id: string }>;
}

const MentorSession = async ({ params }: MentorSessionPageProps) => {
  const { id } = await params;
  const mentor = await getMentor(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = mentor;

  if (!user) redirect('/sign-in');
  if (!name) redirect('/mentor')

  return (
    <main className="animate-fade-in-up">
      {/* Compact session header */}
      <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{name}</h1>
          <p className="text-sm text-text-secondary mt-1">{topic}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="subject-badge">{subject}</span>
          <span className="text-sm text-text-tertiary font-medium">{duration} mins</span>
        </div>
      </div>

      <MentorComponent
        {...mentor}
        mentorId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  )
}

export default MentorSession