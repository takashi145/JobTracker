"use client";
import Link from 'next/link'
import React from 'react'
import ApplicationLogo from './ApplicationLogo';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const NavigationBar = () => {

  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
      toast.success('ログアウトしました。');
    } catch(error: any) {
      toast.error('失敗しました。');
    }
  }

  if (pathname === '/') {
    return <></>
  }

  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center dark:text-white font-bold text-xl">
          <ApplicationLogo />
        </Link>
        

        <div>
          {(pathname !== '/' && pathname !== '/login' && pathname !== '/register') ? (
            <button onClick={() => logout()} className='text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300'>
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
  )
}

export default NavigationBar;