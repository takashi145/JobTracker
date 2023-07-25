import Link from 'next/link';
import StepList from './StepList';
import { Step } from '@/types';
import { cookies } from 'next/headers';

async function getSteps(eventId: string) {
  const res = await fetch(`${process.env.APP_URL}/api/event/${eventId}/step`, {
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

const AddStep = async ({params}: { params: { id: string }}) => {
  const steps: Step[] = await getSteps(params.id);

  return (
    <div className='p-8'>
      <div className='mb-6'>
        <Link href={`/event/${params.id}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-500 hover:underline">
          ←戻る
        </Link>
      </div>
      <StepList steps={steps} eventId={params.id} />
    </div>
  )
}

export default AddStep;
