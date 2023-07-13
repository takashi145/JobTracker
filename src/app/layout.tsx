import ApplicationLogo from '@/components/ApplicationLogo'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobTracker',
  description: '選考状況を視覚化して管理するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <div className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
          <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
              <Link href="/" className="flex items-center dark:text-white font-bold text-xl">
                <ApplicationLogo />
              </Link>
            </div>
          </nav>

          <Toaster />

          <main>
            <div className='max-w-7xl mx-auto'>
              {children}
            </div>
          </main>
            
        </div>
        
      </body>
    </html>
  )
}
