import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link href='/' className=' gap-1.5 flex items-center'>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image src="/images/nexora.png" alt="logo" width={50} height={24} />
                </div>
                <h2 className='text-2xl font-bold'>Nexora</h2>
            </Link>
            <div className='flex items-center gap-8'>
                <NavItems />
                <p>Sign In</p>
            </div>
        </nav>
    )
}

export default Navbar
