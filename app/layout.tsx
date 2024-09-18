import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"


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
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="amber">
              <NavBar></NavBar>
              <main className='p-5'>
                <Container>{children}</Container>
              </main>
            </Theme>

          </AuthProvider>

        </QueryClientProvider>
        <SpeedInsights />
      </body>

    </html>
  )
}
