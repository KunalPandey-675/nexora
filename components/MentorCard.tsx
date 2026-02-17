import { Bookmark, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
// import { usePathname } from "next/navigation";
interface MentorDetail {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
}

interface MentorCardProps {
  details: MentorDetail;
}


const MentorCard = ({ details }: MentorCardProps) => {
  // const pathname = usePathname();
  return (
    <article className="mentor-card p-3 border-[1.34px] border-gray-400">
      <div className="flex flex-col gap-1.5">
        <div className="top flex justify-between">
          <Badge>{details.subject}</Badge>
          <Bookmark />
        </div>
        <h2 className="text-xl font-bold">{details.name}</h2>
        <p className="text-sm">{details.topic}</p>
        <p className="text-sm flex gap-1"><Clock size={20} />{details.duration} mins</p>
        <Link href={`/mentor/${details.id}`} className="w-full">
          <Button>Start Lesson</Button>
        </Link>
      </div>
    </article>
  );
};

export default MentorCard