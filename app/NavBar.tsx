'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname(); //this allow us to know our current page
    //console.log(currentPath);
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>

                <Flex justify={"between"}>
                    <Flex align={"center"} gap={"3"}>
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
                    </Flex>
                    <Box>
                        {
                            status === "authenticated" && (
                                <>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <Avatar 
                                                src={session?.user!.image!} 
                                                fallback="?" 
                                                size={"2"}
                                                radius='full'
                                                className='cursor-pointer'
                                            />
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content>
                                            <DropdownMenu.Label>
                                                <Text size="2">
                                                    {session?.user!.email}
                                                </Text>
                                            </DropdownMenu.Label>
                                            <DropdownMenu.Item>
                                                <Link href="/api/auth/signout">Log Out</Link>  
                                            </DropdownMenu.Item> 
                                        </DropdownMenu.Content>

                                    </DropdownMenu.Root>
                                </>
                            )
                        }
                        {
                            status === "unauthenticated" && (
                                <Link href="/api/auth/signin" >Log In</Link>)
                        }
                    </Box>

                </Flex>
            </Container>


        </nav>
    )
}

export default NavBar