import Link from 'next/link';
import { Event } from '@/types';
import { cookies } from 'next/headers';
import ShowEvent from './ShowEvent';

async function getEvent(id: string) {
  const res = await fetch(`${process.env.APP_URL}/api/event/${id}`, {
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });

  if (!res.ok) {
		throw new Error(`Failed to fetch event`);
	}

  const { data } = await res.json();
  return data
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
