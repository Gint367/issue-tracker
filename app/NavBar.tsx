'use client'
import { Skeleton } from '@/app/components';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Session } from 'next-auth';

const NavBar = () => {
    //console.log(currentPath);
    const { status, data: session } = useSession();
    
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>

                <Flex justify={"between"}>
                    <Flex align={"center"} gap={"3"}>
                        <Link href="/"><FaBug /></Link>
                        <NavLinks />
                        
                    </Flex>
                    {NavRight(status, session)}

                </Flex>
            </Container>


        </nav>
    )
}

export default NavBar

const NavLinks = () => {
    const currentPath = usePathname(); //this allow us to know our current page
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return <ul className='flex space-x-5'>

        {links.map(link => // use the const links for the item
            <li key={link.href}>
                <Link className={classNames({ // uses module classNames to organize the styles
                    "nav-link": true,
                    '!text-zinc-900': link.href === currentPath,
                })} href={link.href}>{link.label}</Link>
            </li>
        )}
    </ul>
}

function NavRight(status: string, session: Session | null) {

    if (status === "loading") return <Skeleton width={"3rem"}/>;
    if (status === "unauthenticated") return <Link className='nav-link' href="/api/auth/signin">Log In</Link>;

    return <Box>
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session?.user!.image!}
                        fallback="?"
                        size={"2"}
                        radius='full'
                        className='cursor-pointer'
                        referrerPolicy='no-referrer' />
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

    </Box>;
}
