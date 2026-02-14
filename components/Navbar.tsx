"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <nav className='navbar'>
                <Link href='/' className='gap-1.5 flex items-center'>
                    <div className='flex items-center gap-2.5 cursor-pointer'>
                        <Image src="/images/nexora.png" alt="logo" width={50} height={24} />
                    </div>
                    <h2 className='text-2xl font-bold'>Nexora</h2>
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
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </nav>
            
            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <button 
                    className='absolute top-6 right-6 w-8 h-8 flex items-center justify-center'
                    onClick={toggleMobileMenu}
                    aria-label='Close menu'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
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
