"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import ApplicationLogo from './ApplicationLogo';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/app/loading';

const NavigationBar = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    setLoading(true);

    await fetch('/api/auth/logout', {
      method: 'POST'
    });
    setLoading(false);
    toast.success('ログアウトしました。');
    router.push('/');
  }

  if (pathname === '/') {
    return <></>
  }

  return (
    <>
      { loading && (
        <Loading />
      )}

      <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 shadow">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center dark:text-white font-bold text-xl">
            <ApplicationLogo />
          </Link>
          
          <div>
            {(pathname !== '/' && pathname !== '/login' && pathname !== '/register') ? (
              <button onClick={() => logout()} className='flex items-center text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                ログアウト
              </button>
            ) : (
              <div className='space-x-3'>
                <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300 hover:underline'>ログイン</Link>
                <Link href='/register' className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300 hover:underline'>新規登録</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavigationBar;
