"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CreateEvent = () => {

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  const router = useRouter();

  const addEvent = async () => {
    const data = {
      title: newEventTitle,
      description: newEventDescription
    };

    try {
      const response = await axios.post('/api/event', data);
      toast.success(response.data.message);
      router.push('/event');
    } catch(error: any) {
      toast.error(error.response.data.message);
    }
    
    setNewEventTitle('');
    setNewEventDescription('');
  };

  return (
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
          <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">イベントの追加</h6>
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
  );
  
};

export default CreateEvent;
