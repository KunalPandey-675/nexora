import MentorForm from '@/components/MentorForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const { userId } = await auth()
  if(!userId) redirect('/sign-in')

  return (
    <main className='md:w-2/3 items-center justify-center'>
      <article className='w-full gap-4 flex flex-col'>
        <h1>Mentor Form</h1>
        <MentorForm />
      </article>
    </main>
  )
}

export default page
