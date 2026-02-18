"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <nav className={`navbar transition-all duration-300 ${scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : ''}`}>
                <Link href='/' className='gap-2 flex items-center group'>
                    <div className='flex items-center gap-2.5 cursor-pointer'>
                        <Image src="/images/nexora.png" alt=" logo" width={46} height={22} className="transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <h2 className='text-xl font-bold tracking-tight text-text-primary'>Nexora</h2>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <NavItems />
                    <SignedOut>
                        <SignInButton mode="redirect">
                            <button className='cursor-pointer btn-signin'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className='md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50'
                    onClick={toggleMobileMenu}
                    aria-label='Toggle menu'
                >
                    <span className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMobileMenu}
            />

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-surface-raised z-50 shadow-[-8px_0_30px_rgba(0,0,0,0.08)] transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <button
                    className='absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-sunken transition-colors duration-200'
                    onClick={toggleMobileMenu}
                    aria-label='Close menu'
                >
                    <svg className='w-5 h-5 text-text-secondary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>

                <div className='flex flex-col gap-6 p-8 pt-20'>
                    <div onClick={toggleMobileMenu}>
                        <NavItems />
                    </div>
                    <SignedOut>
                        <SignInButton mode="redirect">
                            <button className='cursor-pointer font-semibold btn-signin flex justify-center' onClick={toggleMobileMenu}>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </>
    )
}

export default Navbar
