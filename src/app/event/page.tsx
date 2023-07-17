"use client";
import SelectionStatus from '@/components/SelectionStatus';
import { Event } from '@/types';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const initialEvents = [
  {
    _id: 1,
    title: "イベント１",
    description: "イベント１の詳細説明",
    steps: [
      {
        _id: 1,
        name: "ステップ１",
        description: "ステップ１の詳細説明",
        order: 1,
        deadline: new Date(2023, 8, 10),
        status: "completed",
      },
      {
        _id: 2,
        name: "ステップ２",
        description: "ステップ２の詳細説明",
        order: 2,
        deadline: new Date(2023, 8, 20),
        status: "completed",
      },
      {
        _id: 3,
        name: "ステップ3",
        description: "ステップ3の詳細説明",
        order: 3,
        deadline: new Date(2023, 8, 20),
        status: "completed",
      },
    ],
  },
  {
    _id: 2,
    title: "イベント2",
    description: "イベント２の詳細説明",
    steps: [
      {
        _id: 4,
        name: "ステップ4",
        description: "ステップ4の詳細説明",
        order: 1,
        deadline: new Date(2023, 9, 10),
        status: "completed",
      },
      {
        _id: 5,
        name: "ステップ5",
        description: "ステップ5の詳細説明",
        order: 2,
        deadline: new Date(2023, 9, 20),
        status: "completed",
      },
      {
        _id: 6,
        name: "ステップ6",
        description: "ステップ6の詳細説明",
        order: 3,
        deadline: new Date(2023, 9, 10),
        status: "",
      },
      {
        _id: 7,
        name: "ステップ7",
        description: "ステップ7の詳細説明",
        order: 4,
        deadline: new Date(2023, 9, 20),
        status: "",
      },
    ],
  },
];

function Event() {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // setEvents(initialEvents);
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
