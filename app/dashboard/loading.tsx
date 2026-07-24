import { DashboardSectionSkeleton, PageHeaderSkeleton } from '@/components/skeletons';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <PageHeaderSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardSectionSkeleton />
            <DashboardSectionSkeleton />
          </div>

          <div className="space-y-8">
            <DashboardSectionSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
