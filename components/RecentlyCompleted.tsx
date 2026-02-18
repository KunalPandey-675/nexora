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
                    <p className="text-xl text-gray-500">No mentor history yet</p>
                    <Link href="/mentor/new-mentor" className="text-lg text-blue-600 hover:underline">
                        <Button>
                            Create a mentor now!!
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
                        <TableRow>
                            <TableHead className="text-lg w-2/3">Lessons</TableHead>
                            <TableHead className="text-lg">Subjects</TableHead>
                            <TableHead className="text-lg text-right">Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mentors?.map((mentor) => (
                            <TableRow key={mentor.id}>
                                <TableCell>
                                    <Link href={`/mentor/${mentor.id}`}>
                                        <div className="flex items-center gap-2">
                                            <div className="size-18 flex items-center justify-center rounded-lg max-md:hidden">
                                                <BookAudio size={25} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="font-bold text-xl">
                                                    {mentor.name}
                                                </p>
                                                <p className="text-lg">
                                                    {mentor.topic}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit ">
                                        {mentor.subject}
                                    </div>

                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 w-full justify-end">
                                        <p className="text-xl">
                                            {mentor.duration} {' '}
                                            <span className="max-md:hidden">mins</span>
                                        </p>
                                        <Clock size={16} />
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
