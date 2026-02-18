import { getMentor } from "@/lib/actions/mentor.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import MentorComponent from "@/components/MentorComponent";
import { BookAudio } from "lucide-react";

interface MentorSessionPageProps {
  params: Promise<{ id: string }>;
}

const MentorSession = async ({ params }: MentorSessionPageProps) => {
  const { id } = await params;
  const mentor = await getMentor(id);
  const user = await currentUser();

  const { name, subject, title, topic, duration } = mentor;

  if (!user) redirect('/sign-in');
  if (!name) redirect('/mentor')

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="size-14 flex items-center justify-center rounded-xl bg-accent-blue/10 max-md:hidden">
            <BookAudio size={28} className="text-accent-blue" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-xl tracking-tight text-text-primary">
                {name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-sm text-text-secondary">{topic}</p>
          </div>
        </div>
        <div className="items-start text-lg text-text-tertiary font-medium max-md:hidden">
          {duration} mins
        </div>
      </article>

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