"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const CreateEvent = () => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addEvent = async () => {
    setLoading(true);

    const data = {
      title: newEventTitle,
      description: newEventDescription
    };

    try {
      const res = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      toast.success('作成に成功しました。');

      router.push('/event');
      router.refresh();
    } catch(error: any) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setNewEventTitle('');
      setNewEventDescription('');
    }
  };

  return (
    <>
      { loading && (
        <Loading />
      ) }
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          addEvent();
        }} 
        method="POST" 
        className="pt-4 pb-12"
      >
        <div className="px-3 md:px-8 mb-3">
          <Link href="/event" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-500 hover:underline">
            ←戻る
          </Link>
        </div>
        <div className="mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-8">
          <div className="mb-8 lg:mb-0 w-full max-w-lg md:max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-gray-700 lg:sticky top-16">
            <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">目標の追加</h6>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder=""
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder=""
                  className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-blue-500 hover:text-white border border-blue-500 hover:border-blue-600 hover:bg-blue-400 rounded-lg p-2 mb-4"
              >
                作成
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
    
  );
  
};

export default CreateEvent;
