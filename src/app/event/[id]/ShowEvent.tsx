"use client";
import Loading from '@/app/loading';
import { Event } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast';

const ShowEvent = ({ event }: { event: Event }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const progressPercentage = useMemo(() => {
    if (!event) {
      return 0;
    }
    const totalSteps = event.steps.length;
    const completedSteps = event.steps.filter(step => step.status == 1).length;

    if (totalSteps === 0) {
      return 0;
    }

    return Math.round((completedSteps / totalSteps) * 100);
  }, [event]);

  const deleteEvent = async () => {
    if (!confirm('本当に削除してよろしいですか？')) return;
    
    setLoading(true);
    try {
      await fetch(`/api/event/${event._id}`, {
        method: 'DELETE'
      });
      toast.success('削除しました。');
      router.push('/event');
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      toast.error('削除に失敗しました。');
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);
  
  useEffect(() => {
    let currentProgress = 0;
    const increment = progressPercentage / 100;
    
    const animateProgress = () => {
      currentProgress += increment;
      if (currentProgress < progressPercentage) {
        setAnimatedProgress(currentProgress);
        requestAnimationFrame(animateProgress);
      } else {
        setAnimatedProgress(progressPercentage);
      }
    };
  
    animateProgress();
  }, [progressPercentage]);
  
  return (
    <>
      { loading && (
        <Loading />
      )}

      <div className="my-4 mx-3">
        <h2 className="text-gray-700 text-3xl font-semibold text-center dark:text-white">{event.title}</h2>
        <div className='flex items-center justify-center space-x-6'>
          <form onSubmit={(e) => {
            e.preventDefault();
            deleteEvent();
          }}>
            <button type="submit" className='text-sm flex items-center text-red-500 dark:text-red-400 hover:underline'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1 text-red-500 dark:text-red-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Delete
            </button>
          </form>
          

          <button className='text-sm flex items-center text-blue-500 dark:text-blue-400 hover:underline'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Edit
          </button>
        </div>

        <p className="mt-3 px-3 sm:px-0 w-full sm:w-2/3 mx-auto text-gray-700 font-semibold dark:text-gray-300 text-center" style={{wordWrap: 'break-word'}}>{event.description}</p>
      </div>
      
      <div className="sm:px-12 sm:pb-12 my-12 flex justify-center flex-col-reverse sm:flex-row items-center sm:space-x-20 lg:space-x-32">
        {/* 進捗ステップ */}
        <ol className="relative text-gray-500 border-l border-gray-300 dark:border-gray-700 dark:text-gray-400 space-y-20">
          {event.steps.map((step, index) => (
            <li key={index} className="mb-10 sm:mb-12 pl-14 md:pl-12">
              {step.status == 1 ?
                <div className="absolute flex items-center justify-center w-12 h-12 bg-green-400 rounded-full -left-6 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                :
                <div className="absolute flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full -left-6 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></div>
              }
              <h3 className={`pt-3 pb-3 font-medium leading-tight ${step.status == 1 ? 'text-blue-400' : ''}`}>{step.name}</h3>
              <p className='mb-3 text-sm md:text-md'>{step.deadline ? `日付： ${new Date(step.deadline).toISOString().substring(0, 10)}` : ''}</p>
              <p className='text-sm md:text-md'>{step.description}</p>
            </li>
          ))}
          <li className="mb-10">
            <span className={`${progressPercentage === 100 ? 'bg-gray-200 text-orange-400' : 'bg-gray-300 dark:bg-gray-600'} absolute flex items-center justify-center w-12 h-12 rounded-full -left-6 ring-4 ring-white dark:ring-gray-900`}> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
            </span>
          </li>
        </ol>
        
        {/* 進捗パーセント */}
        <div className='mb-8 md:mb-0 sm:sticky top-40'>
          <div className="relative sm:mb-0 w-60 h-60 lg:w-72 lg:h-72">
            <svg className="w-full h-full fill-gray-400 dark:fill-black" viewBox="0 0 36 36">
              <path className="text-gray-300 dark:text-gray-700 stroke-current stroke-2" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`${ animatedProgress === 100 ? ' text-green-400' : 'text-blue-500'} stroke-current stroke-2`} strokeDasharray="100, 100" style={{strokeDashoffset: (100 - animatedProgress)}} d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="text-2xl font-semibold text-white">{Math.round(animatedProgress)}%</span>
            </div>
          </div>
          <div className='mt-3 flex justify-center'>
            <Link href={`/event/${event._id}/step`} className='flex items-center text-blue-500 dark:text-blue-400 hover:underline' replace>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              ステップを管理 →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowEvent;
