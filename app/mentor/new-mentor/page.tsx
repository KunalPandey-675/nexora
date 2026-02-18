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
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold max-sm:text-3xl">Create Your AI Mentor</h1>
            <p className="text-muted-foreground text-lg">
              Design a personalized AI mentor to guide your learning journey. Choose the subject, teaching style, and voice that works best for you.
            </p>
          </div>
          <div className="rounded-4xl border-2 border-black bg-white p-8 max-sm:p-4 shadow-sm">
            <MentorForm />
          </div>
        </article>
      ) : (
        <article className="mentor-limit animate-fade-in-up max-w-2xl mx-auto">
          <div className="cta-badge text-base font-semibold shadow-sm">Upgrade your plan</div>
          <h1 className="text-5xl max-sm:text-3xl">You've Reached Your Limit</h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            You've reached your companion limit. Upgrade to create more companions and unlock premium features.
          </p>
          <Link 
            href="/subscriptions" 
            className="btn-primary w-full max-w-md justify-center text-lg py-3 mt-4 hover:opacity-90 transition-opacity shadow-md"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  )
}



export default page
