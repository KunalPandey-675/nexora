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
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div className="size-18 flex items-center justify-center rounded-lg max-md:hidden">
            <BookAudio size={35} />

          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">
                {name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
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