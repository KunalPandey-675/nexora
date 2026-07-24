import { MentorFormSkeleton } from '@/components/skeletons';

export default function NewMentorLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <MentorFormSkeleton />
      </div>
    </div>
  );
}
