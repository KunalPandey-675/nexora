import { MentorSessionSkeleton } from '@/components/skeletons';

export default function MentorSessionLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <MentorSessionSkeleton />
      </div>
    </div>
  );
}
