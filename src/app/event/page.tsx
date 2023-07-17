"use client";
import SelectionStatus from '@/components/SelectionStatus';
import { Event } from '@/types';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Event() {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const response = await axios.get('/api/event');
      setEvents(response.data.data);
    } catch (error: any) {
    }
  }

  return (
    <div className="relative py-8">
      <div className='flex justify-end pr-4 pb-4 border-b border-gray-600'>
        <Link 
          href="/event/create" 
          className='flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 hover:dark:bg-blue-600 focus:ring-4 px-3 py-2 rounded shadow'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          追加
        </Link>
      </div>
      
      {events.length >= 1 && events.map((event) => (
        <div key={event._id} className="py-8 max-w-5xl mx-auto mb-8 border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-xl text-center font-semibold text-gray-700 dark:text-white">
            {event.title}
          </h2>
          
          <SelectionStatus steps={event.steps} />

          <div className="text-end px-8">
            <Link href={`/event/${event._id}`} className="text-blue-400 hover:text-blue-600 hover:underline">
              詳細→
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Event
