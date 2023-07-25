import Link from 'next/link';
import { Event } from '@/types';
import axios from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ShowEvent from './ShowEvent';

async function getEvent(id: string) {
  try {
    const response = await axios.get(`http://localhost:3000/api/event/${id}`, {
      headers: {
        Cookie: `token=${cookies().get("token")?.value}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch event");
  }
}

export default async function CompanyPage({params}: { params: { id: string }}) {
  const event: Event = await getEvent(params.id);

  return (
    <div className='pt-6 pb-8'>
      <div className="px-8">
        <Link href="/event" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-500 hover:underline" replace>
          ←戻る
        </Link>
      </div>
      <ShowEvent event={event} />
    </div>
  );
}
