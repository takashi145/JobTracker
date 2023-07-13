"use client";
import React, { useState } from 'react'

export interface Step {
  name: string,
  description: string,
  order: number,
  deadline: Date | null,
  status: string,
}

const AddStep = () => {
  const [newSteps, setNewSteps] = useState<Step[]>([{ name: '', description: '', order: 0, deadline: null, status: '' }]);

  const addStep = () => {
    setNewSteps([...newSteps, { name: '', description: '', order: 0, deadline: null, status: '' }]);
  };

  const removeEventField = (index: number) => {
    if (newSteps.length > 1) {
      const newEventsCopy = [...newSteps];
      newEventsCopy.splice(index, 1);
      setNewSteps(newEventsCopy);
    }
  };

  const handleStepNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newStepsCopy = [...newSteps];
    newStepsCopy[index].name = e.target.value;
    setNewSteps(newStepsCopy);
  };

  const handleStepDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newStepsCopy = [...newSteps];
    newStepsCopy[index].description = e.target.value;
    setNewSteps(newStepsCopy);
  };

  const handleStepOrderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newStepsCopy = [...newSteps];
    newStepsCopy[index].order = parseInt(e.target.value);
    setNewSteps(newStepsCopy);
  };

  const handleStepDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newStepsCopy = [...newSteps];
    newStepsCopy[index].deadline = new Date(e.target.value);
    setNewSteps(newStepsCopy);
  };

  const handleStepStatusChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newStepsCopy = [...newSteps];
    newStepsCopy[index].status = e.target.value;
    setNewSteps(newStepsCopy);
  };

  return (
    <form className='py-12 px-8'>
      <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ステップ</h6>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newSteps.map((newStep, index) => (
        <div key={index} className="mb-8 lg:mb-0 w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="step-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Name</label>
              <input
                type="text"
                name="step-name"
                id="step-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required
                value={newStep.name}
                onChange={(e) => handleStepNameChange(e, index)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeEventField(index)}
              disabled={newSteps.length <= 1}
              className="self-start ml-4 p-2 text-red-500 hover:text-red-600 border border-red-500 hover:border-red-600 rounded-lg"
            >
              削除
            </button>
          </div>
          <label htmlFor="step-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Description</label>
          <textarea
            name="step-description"
            id="step-description"
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newStep.description}
            onChange={(e) => handleStepDescriptionChange(e, index)}
          ></textarea>
          <label htmlFor="step-order" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Order</label>
          <input
            type="number"
            name="step-order"
            id="step-order"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder=""
            required
            value={newStep.order}
            onChange={(e) => handleStepOrderChange(e, index)}
          />
          <label htmlFor="step-deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Deadline</label>
          <input
            type="date"
            name="step-deadline"
            id="step-deadline"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder=""
            value={newStep.deadline ? newStep.deadline.toISOString().substring(0, 10) : ''}
            onChange={(e) => handleStepDeadlineChange(e, index)}
          />
          <label htmlFor="step-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Step Status</label>
          <input
            type="text"
            name="step-status"
            id="step-status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder=""
            required
            value={newStep.status}
            onChange={(e) => handleStepStatusChange(e, index)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="flex items-center text-blue-500 hover:text-white border border-blue-500 hover:border-blue-600 hover:bg-blue-400 rounded p-2 mb-4 max-h-12"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        ステップを追加
      </button>
      </div>
    </form>
  )
}

export default AddStep;
