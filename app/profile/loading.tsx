import { ProfileSkeleton } from '@/components/skeletons';

export default function ProfileLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <ProfileSkeleton />
      </div>
    </div>
  );
}
