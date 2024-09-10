import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

import { Theme, ThemePanel } from '@radix-ui/themes';


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Track your issue today',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Theme accentColor="amber">
          <NavBar></NavBar>
          <main className='p-5'>{children}</main>
        </Theme>
        </body>
        
    </html>
  )
}
