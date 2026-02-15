"use client"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SubjectInput = () => {

    const pathname= usePathname()
    const router= useRouter()
    const searchParams= useSearchParams();
    const query= searchParams.get('topic') ||''

    const [searchQuery, setSearchQuery]= useState("");
       useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/mentor') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);


  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Search size={15} />
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
  )
}

export default SubjectInput
