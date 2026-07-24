'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function MentorSessionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Mentor session error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Session Error
        </h2>
        <p className="text-text-secondary mb-6">
          We could not start your mentoring session. Please try again.
        </p>

        <div className="flex gap-3 flex-col sm:flex-row">
          <Button
            onClick={reset}
            variant="default"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
          <Link href="/mentor" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Mentors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
