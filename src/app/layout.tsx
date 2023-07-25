import NavigationBar from '@/components/NavigationBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '進捗ビジュ',
    template: `進捗ビジュ | %s`
  },
  description: '目標達成までの進捗状況を視覚化して管理するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={inter.className}>
        <div className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
          
          <NavigationBar />

          <Toaster />

          <main>
            <div className='max-w-7xl mx-auto'>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
