import { cn } from '@/lib/utils';

/**
 * Skeleton component for generic loading states
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-secondary', className)}
      {...props}
    />
  );
}

/**
 * Loading skeleton for mentor cards in library
 */
export function MentorCardSkeleton() {
  return (
    <div className="rounded-lg border border-surface-secondary overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-surface-secondary/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-surface-secondary flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Loading skeleton for mentor library grid
 */
export function MentorLibrarySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MentorCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Loading skeleton for mentor session (detailed view)
 */
export function MentorSessionSkeleton() {
  return (
    <div className="space-y-6">
      {/* Mentor Info Section */}
      <div className="flex gap-6 max-sm:flex-col">
        <div className="mentor-section">
          <Skeleton className="w-[130px] h-[130px] rounded-xl mx-auto" />
          <Skeleton className="h-8 w-3/4 mt-4 mx-auto" />
          <Skeleton className="h-5 w-1/2 mt-2 mx-auto" />
        </div>

        <div className="user-section space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-[130px] h-[130px] rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Transcript Area */}
      <div className="space-y-3 h-64 overflow-hidden">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-5/6 rounded-lg ml-auto" />
        <Skeleton className="h-16 w-4/5 rounded-lg" />
        <Skeleton className="h-16 w-3/4 rounded-lg ml-auto" />
      </div>
    </div>
  );
}

/**
 * Loading skeleton for form inputs
 */
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

/**
 * Loading skeleton for mentor creation form
 */
export function MentorFormSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Skeleton className="h-8 w-1/3 mb-6" />
      </div>

      {/* Form fields */}
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />

      <div className="grid grid-cols-2 gap-4">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>

      <FormFieldSkeleton />

      {/* Submit button */}
      <Skeleton className="h-10 w-full rounded-md mt-8" />
    </div>
  );
}

/**
 * Loading skeleton for dashboard section
 */
export function DashboardSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/4 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-3 border border-surface-secondary rounded-lg">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Loading skeleton for profile page
 */
export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 w-32 rounded-md mt-3" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border border-surface-secondary rounded-lg">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))}
      </div>

      {/* Sections */}
      <DashboardSectionSkeleton />
      <DashboardSectionSkeleton />
    </div>
  );
}

/**
 * Loading skeleton for page header with title
 */
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2 mb-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  );
}

/**
 * Loading skeleton for table rows
 */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Loading skeleton for data table
 */
export function DataTableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-surface-secondary">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} cols={cols} />
      ))}
    </div>
  );
}
