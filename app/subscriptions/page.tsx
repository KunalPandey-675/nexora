import React from 'react'
import { PricingTable } from '@clerk/nextjs'

const page = () => {
  return (
    <main className="min-h-[calc(100vh-200px)]">
      <div className="animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Choose Your Plan</h1>
          <p className="text-text-secondary text-sm">Unlock more mentors and premium features</p>
        </div>
        <PricingTable />
      </div>
    </main>
  )
}

export default page
