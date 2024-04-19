'use client'

import { Button } from '../../../../src/components/shared/Button';

const Loading = () => {
  return (
    <section className='flex mx-8 text-2xl py-4'>
      <div>
        <h2 className='font-semibold text-black'>Current specialties menu:</h2>
        <div className='grid grid-cols-1  gap-3 text-black  p-2'>
          {/* Placeholder skeleton for current specialties menu */}
          {Array.from({ length: 8 }).map((item, index) => (
            <div key={index} className='text-sm flex space-x-1 rounded-md border-2 border-gray-400 p-2 animate-pulse'>
              <div className='w-[310px] h-[110px] flex flex-row space-x-3 bg-gray-200 rounded-sm'></div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-col'>
                    <div className='h-5 w-32 bg-gray-200 rounded'></div>
                    <div className='h-4 w-20 bg-gray-200 mt-1 rounded'></div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='h-8 w-14 bg-gray-200 rounded'></div>
                  </div>
                </div>
                <div className='h-12 bg-gray-200 mt-1 rounded'></div>
                <div className='h-12 bg-gray-200 mt-2 rounded'></div>
              </div>
              <div className='flex flex-col space-y-6'>
                {/* Render buttons skeleton */}
                <div className='h-10 w-32 bg-gray-200 rounded'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='font-semibold text-black'>Create new specialties menu:</h2>
        <div className='flex flex-col'>
          <div className='flex justify-between space-x-4'>
            <div className='flex flex-col w-full'>
              <h3 className='text-xl text-black'>Picked dishes:</h3>
              <div className='overflow-y-auto max-h-[480px]'></div>
            </div>
            <div className='flex flex-col w-full'>
              <h3 className='text-xl text-black'>All dishes:</h3>
              <div className='overflow-y-auto max-h-[480px]'>
                {/* Placeholder skeleton for all dishes */}
                {Array.from({ length: 8 }).map((item, index) => (
                  <div key={index} className='text-sm flex space-x-1 rounded-md border-2 border-gray-400 p-2 animate-pulse'>
                    <div className='w-[310px] h-[110px] flex flex-row space-x-3 bg-gray-200 rounded-sm'></div>
                    <div className='flex flex-col w-full'>
                      <div className='flex flex-row justify-between'>
                        <div className='flex flex-col'>
                          <div className='h-5 w-32 bg-gray-200 rounded'></div>
                          <div className='h-4 w-20 bg-gray-200 mt-1 rounded'></div>
                        </div>
                        <div className='flex flex-col'>
                          <div className='h-8 w-14 bg-gray-200 rounded'></div>
                        </div>
                      </div>
                      <div className='h-12 bg-gray-200 mt-1 rounded'></div>
                      <div className='h-12 bg-gray-200 mt-2 rounded'></div>
                    </div>
                    <div className='flex flex-col space-y-6'>
                      {/* Render buttons skeleton */}
                      <div className='h-10 w-32 bg-gray-200 rounded'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Button for creating new menu */}
          <Button disabled isLoading onClick={() => {}}>
            Create new menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Loading;
