import { NavigationEvents } from '@/lib/navEvents';
import { AuthContextProvider } from '@/context/authContext';
import NavBar from '@/components/layout/nav';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SHS Web Dev Club',
  description: 'A safe space to learn and practice web development at SHS.',
  keywords: ['web', 'development', 'club', 'shs', 'sharon high school', 'sharon', 'high school', 'sharon ma', 'cqb13'],
  generator: 'Next.js',
  applicationName: 'SHS Web Dev Club',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'cqb13', url: 'https://cqb13.dev' }],
  colorScheme: 'dark',
  creator: 'cqb13',
  publisher: 'SHS Web Dev Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SHS Web Dev Club',
    description: 'A safe space to learn and practice web development at SHS.',
    url: 'https://cqb13.dev',
    siteName: 'SHS Web Dev Club',
    images: [
      {
        url: 'https://cqb13.dev/icon.png',
        width: 600,
        height: 600,
        alt: 'SHS Web Dev Club Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background flex flex-col min-h-screen absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]`}>
        <AuthContextProvider>
          <NavBar />
          {children}
          <footer className='flex justify-between px-4 py-2 text-sm shrink-0'>
            <p>SHS Web Dev Club | © 2023</p> <p>Created by cqb13</p>
          </footer>
        </AuthContextProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  )
}