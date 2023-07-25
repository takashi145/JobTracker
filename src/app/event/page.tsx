import SelectionStatus from './SelectionStatus';
import { Event } from '@/types';
import axios from 'axios';
import { Metadata } from 'next';
import Link from 'next/link'

async function getEvents() {
  try {
    const response = await axios.get('http://localhost:3000/api/event');
    return response.data.data;
  } catch (error: any) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: '目標一覧' };
}

async function Event() {

  const events: Event[] = await getEvents();

  return (
    <div className="relative py-8">
      <div className='flex justify-end pr-4 pb-3 border-b border-gray-600'>
        <Link 
          href="/event/create" 
          className='flex items-center text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 hover:dark:bg-blue-600 focus:ring-4 px-3 py-2 rounded shadow'
          replace
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          新規目標を追加
        </Link>
      </div>
      
      {events && events.length >= 1 && events.map((event) => (
        <div key={event._id} className="py-8 max-w-5xl mx-auto mb-8 border-b border-gray-300 dark:border-gray-600">
          <h2 className="mr-4 text-xl text-center font-semibold text-gray-700 dark:text-white">
            {event.title}
          </h2>
          
          <SelectionStatus steps={event.steps} />

          {
            event.steps.length === 0 && (
              <div className="flex flex-col md:flex-row items-center justify-center text-center dark:text-gray-400">
                ステップが登録されていません。
                <Link href={`/event/${event._id}/step`} className='mt-2 ml-2 text-blue-500 dark:text-blue-400 underline'>ステップを追加→</Link>
              </div>
            )
          }

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
