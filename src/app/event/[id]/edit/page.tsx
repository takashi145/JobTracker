import React from 'react';
import UpdateForm from './UpdateForm';
import { Event } from '@/types';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getEvent(eventId: string) {
  const res = await fetch(`${process.env.APP_URL}/api/event/${eventId}`, {
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
		throw new Error(`Failed to fetch data`);
	}

  const { data } = await res.json();
  return data;
}


const CreateEvent = async ({params}: { params: { id: string }}) => {

  const event: Event = await getEvent(params.id);

  return (
    <>
      <div className="p-3">
        <Link href={`/event/${params.id}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-500 hover:underline">
          ←戻る
        </Link>
      </div>
      <UpdateForm event={event} />
    </>
  );
  
};

export default CreateEvent;
