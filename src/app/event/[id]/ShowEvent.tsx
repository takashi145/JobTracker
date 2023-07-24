"use client";
import { Event } from '@/types';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'

const ShowEvent = ({ event }: { event: Event }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

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
     <div className="m-3 space-y-3">
        <h2 className="text-gray-700 text-3xl font-semibold text-center dark:text-white">{event.title}</h2>
        <p className="px-3 sm:px-0 w-full sm:w-2/3 mx-auto text-gray-700 font-semibold dark:text-gray-300 text-center" style={{wordWrap: 'break-word'}}>{event.description}</p>
        <div className='text-center'>
          <Link href={`/event/${event._id}/step`} className='text-sm text-blue-500 dark:text-blue-400 hover:underline'>ステップを管理 →</Link>
        </div>
      </div>
      <div className="sm:p-14 mb-12 flex justify-center flex-col-reverse sm:flex-row items-center sm:space-x-20 lg:space-x-32">
        <ol className="relative text-gray-500 border-l border-gray-300 dark:border-gray-700 dark:text-gray-400 space-y-20">
          {event.steps.map((step, index) => (
            <li key={index} className="mb-10 sm:mb-12 pl-14 md:pl-12">
              {step.status == 1 ?
                <div className="absolute flex items-center justify-center w-12 h-12 bg-green-400 rounded-full -left-4 md:-left-8 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                :
                <div className="absolute flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full -left-4 md:-left-8 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"></div>
              }
              <h3 className={`pt-3 pb-3 font-medium leading-tight ${step.status == 1 ? 'text-blue-400' : ''}`}>{step.name}</h3>
              <p className='mb-3 text-sm md:text-md'>{step.deadline ? `日付： ${new Date(step.deadline).toISOString().substring(0, 10)}` : ''}</p>
              <p className='text-sm md:text-md'>{step.description}</p>
            </li>
          ))}
          <li className="mb-10">
            <span className={`${animatedProgress === 100 ? 'bg-gray-200 text-orange-400' : 'bg-gray-300 dark:bg-gray-600'} absolute flex items-center justify-center w-12 h-12 rounded-full -left-4 md:-left-8 ring-4 ring-white dark:ring-gray-900`}> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
            </span>
          </li>
        </ol>
        
        <div className="mb-8 sm:mb-0 w-64 h-64 lg:w-72 lg:h-72 relative sm:sticky sm:top-40">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path className="text-gray-400 dark:text-gray-700 stroke-current stroke-2" d="M18 2.0845
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
      </div>
    </>
    
  )
}

export default ShowEvent;