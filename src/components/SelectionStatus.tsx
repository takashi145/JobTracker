import { Step } from '@/types';
import Link from 'next/link';
import { useState, useEffect, FC } from 'react';

interface SelectionStatusProps {
  steps: Step[];
}

const SelectionStatus: FC<SelectionStatusProps> = ({ steps }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const totalSteps = steps.length;
      const completedSteps = steps.filter(step => step.status == 1).length;
      setProgressPercentage((completedSteps / totalSteps) * 100);
    }, 1000);
  }, [steps]);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="w-full flex items-center justify-center">
        <div className="w-3/4 h-3 bg-white rounded-full flex items-center overflow-hidden dark:bg-gray-200">
          <div 
            className={`${progressPercentage === 100 ? 'bg-green-400 dark:bg-green-500' : 'bg-blue-500'} h-3 rounded-full`}
            style={{ transitionDuration: '2s', width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className={`ml-3 ${progressPercentage === 100 ? 'animate-bounce text-orange-300' : 'text-gray-400 dark:text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 sm:w-8 sm:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
          </svg>
        </div>
      </div>

      <div className={`w-3/4 flex flex-nowrap overflow-x-auto ${steps.length >= 2 ? 'justify-between' : 'justify-center'}`}>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center mr-3">
            <div className={`${step.status == 1 ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'} text-xs sm:text-sm md:text-md`}>
              {step.name}
            </div>
            {step.status == 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {progressPercentage === 100 && (
        <div className="text-green-500 text-xl font-bold">
          All steps are completed!
        </div>
      )}
    </div>
  );
}

export default SelectionStatus;
