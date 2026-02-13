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
import Image from "next/image"
import { BookAudio, Clock } from "lucide-react";

interface RecentlyCompletedProps {
    mentors: Mentor[]
}


const RecentlyCompleted = ({ mentors }: RecentlyCompletedProps) => {
    return (
        <>
            <h1>Recently Completed</h1>
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
                                        <Clock size={16}/>
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
