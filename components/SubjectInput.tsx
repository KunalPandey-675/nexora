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
    <div className="relative border border-border-default rounded-xl items-center flex gap-2 px-3 py-2 h-fit bg-surface-raised hover:border-accent-blue/40 focus-within:border-accent-blue focus-within:ring-2 focus-within:ring-accent-blue/20 transition-all duration-200">
            <Search size={15} className="text-text-tertiary" />
            <input
                placeholder="Search mentors..."
                className="outline-none bg-transparent text-sm text-text-primary placeholder:text-text-tertiary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
  )
}

export default SubjectInput
