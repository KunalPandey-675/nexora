
"use client"
import { Bookmark, Bookmark as BookmarkFilled, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { addBookmark, removeBookmark } from "@/lib/actions/mentor.actions";
interface MentorDetail {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
}

interface MentorCardProps {
  details: MentorDetail;
  bookmarked?: boolean;
}


import { useState } from "react";

const MentorCard = ({ details, bookmarked: initialBookmarked = false }: MentorCardProps) => {
  const pathname = usePathname();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(details.id, pathname);
    } else {
      await addBookmark(details.id, pathname);
    }
    setBookmarked((prev) => !prev);
  };

  return (
    <article className="mentor-card p-3 border-[1.34px] border-gray-400 h-full flex flex-col">
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="top flex justify-between">
          <Badge>{details.subject}</Badge>
          <button onClick={handleBookmark} aria-label="Bookmark mentor" className="focus:outline-none">
            {bookmarked ? (
              <BookmarkFilled fill="#000" stroke="#000" width={20} height={20} />
            ) : (
              <Bookmark width={20} height={20} />
            )}
          </button>
        </div>
        <h2 className="text-xl font-bold">{details.name}</h2>
        <p className="text-sm flex-1">{details.topic}</p>
        <p className="text-sm flex gap-1"><Clock size={20} />{details.duration} mins</p>
        <Link href={`/mentor/${details.id}`} className="w-full">
          <Button>Start Lesson</Button>
        </Link>
      </div>
    </article>
  );
};

export default MentorCard