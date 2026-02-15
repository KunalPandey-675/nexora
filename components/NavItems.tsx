"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Mentor Library", href: "/mentor" },
    { label: "Profile", href: "/profile" }
]
const NavItems = () => {
    const pathname = usePathname()
    return (
        <nav className='flex md:flex-row flex-col md:items-center gap-4'>
            {navItems.map(({ label, href }) => (
                <Link href={href} key={label} className={cn(pathname === href && 'text-primary font-semibold')}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}
export default NavItems
