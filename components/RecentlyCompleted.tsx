import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { BookAudio, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface RecentlyCompletedProps {
    mentors: Mentor[]
}


const RecentlyCompleted = ({ mentors }: RecentlyCompletedProps) => {
    if (!mentors || mentors.length === 0) {
        return (
            <article className="mentor-list">
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <p className="text-sm text-text-tertiary">No mentor history yet</p>
                    <Link href="/mentor/new-mentor">
                        <Button className="bg-cta text-white hover:bg-cta/90 rounded-xl shadow-sm transition-all duration-300 text-sm">
                            Create a mentor
                        </Button>
                    </Link>
                </div>
            </article>
        )
    }

    return (
        <>
            <article className="mentor-list">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border-subtle hover:bg-transparent">
                            <TableHead className="text-sm font-semibold text-text-tertiary w-2/3">Lessons</TableHead>
                            <TableHead className="text-sm font-semibold text-text-tertiary">Subject</TableHead>
                            <TableHead className="text-sm font-semibold text-text-tertiary text-right">Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mentors?.map((mentor) => (
                            <TableRow key={mentor.id} className="border-border-subtle hover:bg-surface-sunken/50 transition-colors duration-150">
                                <TableCell>
                                    <Link href={`/mentor/${mentor.id}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 flex items-center justify-center rounded-xl bg-accent-blue/8 max-md:hidden">
                                                <BookAudio size={20} className="text-accent-blue" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="font-semibold text-base text-text-primary">
                                                    {mentor.name}
                                                </p>
                                                <p className="text-sm text-text-secondary">
                                                    {mentor.topic}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit">
                                        {mentor.subject}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 w-full justify-end text-text-secondary">
                                        <p className="text-sm font-medium">
                                            {mentor.duration}{' '}
                                            <span className="max-md:hidden">mins</span>
                                        </p>
                                        <Clock size={13} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </article>
        </>
    )
}

export default RecentlyCompleted
