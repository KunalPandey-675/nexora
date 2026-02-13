import Cta from "@/components/CTA";
import RecentlyCompleted from "@/components/RecentlyCompleted"
import RecentlyCreated from "@/components/RecentlyCreated"

const mentorDetails = [
  { id: "1", name: "Einstein Class", topic: "Theory of relativity", subject: "physics", duration: 45 },
  { id: "2", name: "Newton Class", topic: "Laws of motion", subject: "physics", duration: 50 },
  { id: "3", name: "Curie Class", topic: "Radioactivity", subject: "chemistry", duration: 40 },
  { id: "4", name: "Turing Class", topic: "Computability theory", subject: "computer science", duration: 55 },
  { id: "5", name: "Tesla Class", topic: "Electromagnetism", subject: "physics", duration: 35 },
  { id: "6", name: "Feynman Class", topic: "Quantum mechanics", subject: "physics", duration: 60 },
  { id: "7", name: "Feynman Class", topic: "Quantum mechanics", subject: "physics", duration: 60 },
  { id: "8", name: "Feynman Class", topic: "Quantum mechanics", subject: "physics", duration: 60 }
]
export const recentSessions = [
    {
        id: "1",
        subject: "science",
        name: "Neura the Brainy Explorer",
        topic: "Neural Network of the Brain",
        duration: 45
    },
    {
        id: "2",
        subject: "maths",
        name: "Countsy the Number Wizard",
        topic: "Derivatives & Integrals",
        duration: 30
    },
    {
        id: "3",
        subject: "language",
        name: "Verba the Vocabulary Builder",
        topic: "English Literature",
        duration: 30
    },
    {
        id: "4",
        subject: "coding",
        name: "Codey the Logic Hacker",
        topic: "Intro to If-Else Statements",
        duration: 45
    },
    {
        id: "5",
        subject: "history",
        name: "Memo, the Memory Keeper",
        topic: "World Wars: Causes & Consequences",
        duration: 15
    },
    {
        id: "6",
        subject: "economics",
        name: "The Market Maestro",
        topic: "The Basics of Supply & Demand",
        duration: 10
    },
];

const Page = () => {
  return (
    <main>
      <RecentlyCreated mentors={mentorDetails}/>
      <Cta/>
      <RecentlyCompleted mentors={recentSessions}/>
    </main >
  )
}

export default Page