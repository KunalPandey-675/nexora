import { MentorLibrarySkeleton } from '@/components/skeletons';

export default function MentorLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="h-8 w-1/4 bg-surface-secondary rounded-md animate-pulse" />
          <div className="h-5 w-1/2 bg-surface-secondary rounded-md animate-pulse" />
        </div>

        {/* Filters - Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-10 w-32 bg-surface-secondary rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-surface-secondary rounded-md animate-pulse" />
        </div>

        {/* Mentor Grid */}
        <MentorLibrarySkeleton count={6} />
      </div>
    </div>
  );
}
