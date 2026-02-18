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
        <nav className='flex md:flex-row flex-col md:items-center gap-1'>
            {navItems.map(({ label, href }) => (
                <Link 
                    href={href} 
                    key={label} 
                    className={cn(
                        'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        pathname === href 
                            ? 'text-cta bg-surface-sunken' 
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-sunken/60'
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}
export default NavItems
