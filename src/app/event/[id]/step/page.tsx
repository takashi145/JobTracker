import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StepList from './StepList';
import { Step } from '@/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/app/loading';

async function getSteps(eventId: string) {
  try {
    const response = await axios.get(`http://localhost:3000/api/event/${eventId}/step`, {
      headers: {
        Cookie: `token=${cookies().get("token")?.value}`,
      },
    });
    return response.data.data;
  } catch(error: any) {
    if (error.response.status === 404) {
      notFound();
    }
    throw new Error("Error");
  }
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
