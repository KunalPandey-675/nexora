import MentorForm from '@/components/MentorForm'
import { newMentorPermissions } from '@/lib/actions/mentor.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const canCreateMentor = await newMentorPermissions()

  return (
    <main className="items-center justify-center min-h-[calc(100vh-200px)]">
      {canCreateMentor ? (
        <article className="w-full max-w-3xl mx-auto flex flex-col gap-8 animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold max-sm:text-2xl tracking-tight text-text-primary">Create Your AI Mentor</h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Design a personalized AI mentor to guide your learning journey. Choose the subject, teaching style, and voice that works best for you.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-surface-raised p-8 max-sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <MentorForm />
          </div>
        </article>
      ) : (
        <article className="mentor-limit animate-fade-in-up max-w-2xl mx-auto">
          <div className="cta-badge text-sm font-semibold">Upgrade your plan</div>
          <h1 className="text-4xl max-sm:text-2xl tracking-tight text-text-primary">You've Reached Your Limit</h1>
          <p className="text-sm text-text-secondary max-w-lg leading-relaxed">
            You've reached your mentor limit. Upgrade to create more mentors and unlock premium features.
          </p>
          <Link 
            href="/subscriptions" 
            className="btn-primary w-full max-w-md justify-center py-3 mt-4 transition-all duration-300"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  )
}



export default page
