import { PageHeaderSkeleton, DashboardSectionSkeleton } from '@/components/skeletons';

export default function SubscriptionsLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <PageHeaderSkeleton />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-surface-secondary rounded-lg p-6 space-y-4">
              <div className="h-6 w-1/2 bg-surface-secondary rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-surface-secondary rounded-md animate-pulse" />
                <div className="h-4 w-4/5 bg-surface-secondary rounded-md animate-pulse" />
              </div>
              <div className="h-10 w-full bg-surface-secondary rounded-md animate-pulse mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
