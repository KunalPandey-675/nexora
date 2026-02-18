
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
    <article className="mentor-card group">
      <div className="flex flex-col gap-3 flex-1">
        <div className="top flex justify-between items-start">
          <Badge className="bg-accent-blue/10 text-accent-blue border-accent-blue/20 hover:bg-accent-blue/15 text-xs font-medium">{details.subject}</Badge>
          <button 
            onClick={handleBookmark} 
            aria-label="Bookmark mentor" 
            className="focus:outline-none p-1 rounded-lg hover:bg-surface-sunken transition-all duration-200"
          >
            {bookmarked ? (
              <BookmarkFilled fill="var(--cta-gold)" stroke="var(--cta-gold)" width={18} height={18} />
            ) : (
              <Bookmark width={18} height={18} className="text-text-tertiary group-hover:text-text-secondary transition-colors duration-200" />
            )}
          </button>
        </div>
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">{details.name}</h2>
        <p className="text-sm text-text-secondary flex-1 leading-relaxed">{details.topic}</p>
        <div className="flex items-center gap-1.5 text-text-tertiary">
          <Clock size={14} />
          <span className="text-xs font-medium">{details.duration} mins</span>
        </div>
        <Link href={`/mentor/${details.id}`} className="w-full">
          <Button className="w-full bg-cta text-white hover:bg-cta/90 rounded-xl shadow-[0_2px_8px_rgba(26,26,46,0.1)] hover:shadow-[0_4px_12px_rgba(26,26,46,0.15)] transition-all duration-300 text-sm font-medium">Start Lesson</Button>
        </Link>
      </div>
    </article>
  );
};

export default MentorCard