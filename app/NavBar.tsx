'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from "next-auth/react"
import { Box } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname(); //this allow us to know our current page
    //console.log(currentPath);
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><FaBug /></Link>
            <ul className='flex space-x-5'>

                {links.map(link => // use the const links for the item
                    <li key={link.href}>
                        <Link className={classNames({ // uses module classNames to organize the styles
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors': true
                        })} href={link.href}>{link.label}</Link>
                    </li>
                )}
            </ul>
            <Box>
                {
                    status === "authenticated" && (
                    <Link href="/api/auth/signout" >Log Out</Link>)
                }
                {
                    status === "unauthenticated" && (
                    <Link href="/api/auth/signin" >Log In</Link>)
                }
            </Box>
        </nav>
    )
}

export default NavBar