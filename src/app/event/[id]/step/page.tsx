"use client";
import Loading from '@/components/Loading';
import { Step } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

export interface NewStep {
  name: string,
  description: string,
  deadline: Date | null,
  status: number,
}

const AddStep = ({params}: { params: { id: string }}) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState<NewStep>({ name: '', description: '', deadline: null, status: 0 });
  const [editStep, setEditStep] = useState<NewStep>({ name: '', description: '', deadline: null, status: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [openEditModalId, setOpenEditModalId] = useState(null);
  const [loading, setLoading] = useState(true);

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
    }finally {
      setLoading(false);
    }
  }

  const addStep = async () => {
    try {
      const response = await axios.post(`/api/event/${params.id}/step`, newStep);
      setSteps([...steps, response.data.data]);
      toast.success(response.data.message);
      setNewStep({ name: '', description: '', deadline: null, status: 0 });
      setOpenModal(false);
    } catch(error: any) {
      toast.error(error.response.data.message);
    }
  };

  const updateStep = async (stepId: string) => {
    try {
      const response = await axios.put(`/api/event/${params.id}/step/${stepId}`, editStep);
      setSteps(steps => steps.map(step => {
        if (step._id === stepId) {
          return response.data.data;
        }
        return step;
      }));
      toast.success(response.data.message);
      setOpenEditModalId(null);
    } catch(error: any) {
      toast.error(error.response.data.message);
    }
  }

  const deleteStep = async (stepId: string) => {
    if (! confirm('削除してもよろしいですか？')) return;
    
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

  if (loading) {
    return <Loading />
  }

  return (
    <div className='py-10 px-8'>
      <div className="pb-5">
        <Link href={`/event/${params.id}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-500 hover:underline">
          ←戻る
        </Link>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map(step => (
        <div key={step._id} className="mb-8 lg:mb-0 w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-gray-700">
          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="step-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Name</label>
              <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.name}</div>
            </div>
            <div className='flex items-center'>
              <button
                type="button"
                onClick={() => {
                  setOpenEditModalId(step._id);
                  setEditStep(step);
                }}
                className="flex items-center self-start ml-4 p-2 text-sm text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                編集
              </button>
              {openEditModalId === step._id && (
                <div key={step._id} className='fixed inset-0 bg-black/50 z-40'>
                  <div aria-hidden="true" className={`${openEditModalId === step._id ? 'z-50' : 'hidden'} z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                      <div className="relative w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <button onClick={() => setOpenEditModalId(null)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                              </button>
                              <div className="px-6 py-6 lg:px-8">
                                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">編集</h3>
                                  <form onSubmit={(e) => {
                                      e.preventDefault();
                                      updateStep(step._id)
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
                                        value={editStep.name}
                                        onChange={(e) => setEditStep({...editStep, name: e.target.value})}
                                      />
                                    </div>

                                    <div className='mb-3'>
                                      <label htmlFor="step-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Description</label>
                                      <textarea
                                        name="step-description"
                                        id="step-description"
                                        placeholder=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        value={editStep.description}
                                        onChange={(e) => setEditStep({...editStep, description: e.target.value})}
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
                                        value={editStep.deadline ? new Date(editStep.deadline).toISOString().substring(0, 10) : ''}
                                        onChange={(e) => setEditStep({...editStep, deadline: new Date(e.target.value)})}
                                      />  
                                    </div>
                                    
                                    <div className='mb-3'>
                                      <label htmlFor="step-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Status</label>
                                      <select 
                                          name="step-status" 
                                          id="step-status" 
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                          value={editStep.status} 
                                          onChange={(e) => setEditStep({...editStep, status: Number(e.target.value)})}
                                          required
                                      >
                                          <option value="">選択してください</option>
                                          <option value="0">未完了</option>
                                          <option value="1">完了</option>
                                      </select>
                                    </div>

                                    <button type='submit' className='text-white bg-blue-500 dark:bg-blue-600 py-2 px-3 rounded shadow w-full'>Save</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => deleteStep(step._id)}
                className="flex items-center self-start ml-4 p-2 text-sm text-red-500 hover:text-red-600 border border-red-500 hover:border-red-600 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
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
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{step.deadline ? new Date(step.deadline).toISOString().substring(0, 10) : '期限なし'}</div> 
          </div>
          
          <div className='mb-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Status</label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {step.status == 1 ? '完了' : '未完了'}
            </div>
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
                                <select 
                                    name="step-status" 
                                    id="step-status" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    value={newStep.status} 
                                    onChange={(e) => setNewStep({...newStep, status: Number(e.target.value)})}
                                    required
                                >
                                    <option value="">選択してください</option>
                                    <option value="0">未完了</option>
                                    <option value="1">完了</option>
                                </select>
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
