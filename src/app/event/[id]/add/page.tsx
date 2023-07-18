"use client";
import { Step } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

export interface NewStep {
  name: string,
  description: string,
  deadline: Date | null,
  status: string,
}

const AddStep = ({params}: { params: { id: string }}) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState<NewStep>({ name: '', description: '', deadline: null, status: '' });
  const [openModal, setOpenModal] = useState(false);

  const getSteps = async () => {
    try {
      const response = await axios.get(`/api/event/${params.id}/step`);
      const steps = response.data.data;

      setSteps(() => [
        ...steps.map((step: Step) => ({
          _id: step._id,
          name: step.name,
          description: step.description,
          deadline: step.deadline,
          status: step.status
        }))
      ]);
    } catch(error: any) {
    }
  }

  const addStep = async () => {
    try {
      const response = await axios.post(`/api/event/${params.id}/step`, newStep);
      setSteps([...steps, response.data.data]);
      toast.success(response.data.message);
      setNewStep({ name: '', description: '', deadline: null, status: '' });
      setOpenModal(false);
    } catch(error: any) {
      toast.error(error.response.data.message);
    }
  };

  const deleteStep = async (stepId: string) => {
    try {
      const response = await axios.delete(`/api/event/${params.id}/step/${stepId}`);
      toast.success(response.data.message);

      setSteps(steps => steps.filter(step => step._id !== stepId));
    } catch(error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSteps();
  }, []);

  return (
    <div className='py-12 px-8'>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map(step => (
        <div key={step._id} className="mb-8 lg:mb-0 w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-gray-700">
          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="step-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Name</label>
              <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.name}</div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => alert(step._id)}
                className="self-start ml-4 p-2 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg"
              >
                編集
              </button>
              <button
                type="button"
                onClick={() => deleteStep(step._id)}
                className="self-start ml-4 p-2 text-red-500 hover:text-red-600 border border-red-500 hover:border-red-600 rounded-lg"
              >
                削除
              </button>  
            </div>
            
          </div>
          <div className='mb-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Description</label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.description ? step.description : ''}</div>
          </div>
          
          <div className='mb-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Deadline</label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.deadline ? step.deadline : '期限なし'}</div> 
          </div>
          
          <div className='mb-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Status</label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.status}</div>
          </div>
         
        </div>
      ))}
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="flex items-center text-blue-500 hover:text-white border border-blue-500 hover:border-blue-600 hover:bg-blue-400 rounded p-2 mb-4 max-h-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          ステップを追加
        </button>
      </div>

      {openModal && (
        <div className='fixed inset-0 bg-black/50 z-40'>
            <div aria-hidden="true" className={`${openModal ? 'z-50' : 'hidden'} z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                addStep();
                              }} 
                              className="lg:mb-0 w-full max-w-x p-2"
                            >
                              <div className='mb-3'>
                                <label htmlFor="step-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Name</label>
                                <input
                                  type="text"
                                  name="step-name"
                                  id="step-name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder=""
                                  required
                                  value={newStep.name}
                                  onChange={(e) => setNewStep({...newStep, name: e.target.value})}
                                />
                              </div>

                              <div className='mb-3'>
                                <label htmlFor="step-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Description</label>
                                <textarea
                                  name="step-description"
                                  id="step-description"
                                  placeholder=""
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  value={newStep.description}
                                  onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                                ></textarea>  
                              </div>
                              
                              <div className='mb-3'>
                                <label htmlFor="step-deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Deadline</label>
                                <input
                                  type="date"
                                  name="step-deadline"
                                  id="step-deadline"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder=""
                                  value={newStep.deadline ? newStep.deadline.toISOString().substring(0, 10) : ''}
                                  onChange={(e) => setNewStep({...newStep, deadline: new Date(e.target.value)})}
                                />  
                              </div>
                              
                              <div className='mb-3'>
                                <label htmlFor="step-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Status</label>
                                <input
                                  type="text"
                                  name="step-status"
                                  id="step-status"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder=""
                                  required
                                  value={newStep.status}
                                  onChange={(e) => setNewStep({...newStep, status: e.target.value})}
                                />  
                              </div>

                              <button type='submit' className='text-white bg-blue-500 dark:bg-blue-600 py-2 px-3 rounded shadow w-full'>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default AddStep;
