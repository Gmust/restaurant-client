'use client';

import { Button } from '../../../../src/components/shared/Button';

const Loading = () => {
  return (
    <div className='flex justify-between p-3'>
      <div className='flex flex-col items-start w-1/2'>
        <h2 className='text-3xl text-black font-semibold'>Current events:</h2>
        <div className='flex flex-col w-full'>
          {Array.from({ length: 3 }).map((event, index) =>
            <div key={index}
                 className='w-full flex flex-col justify-between p-2 m-3 bg-gray-200 border-2 border-gray-400 rounded-lg'>
              <div className='flex justify-between'>
                <div>
                  <div className='h-6 w-3/4 bg-gray-300 mb-2'></div>
                  <div className='h-16 w-full bg-gray-300'></div>
                </div>
                <div className='flex space-x-4'>
                  {/* Skeleton for update/delete buttons */}
                  <div className='h-8 w-8 bg-gray-300'></div>
                  <div className='h-8 w-8 bg-gray-300'></div>
                </div>
              </div>
              <div className='flex justify-between'>
                {/* Skeleton for start date */}
                <div className='flex flex-col'>
                  <div className='h-6 w-20 bg-gray-300'></div>
                  <div className='h-6 w-20 bg-gray-300'></div>
                </div>
                {/* Skeleton for end date */}
                <div className='flex flex-col'>
                  <div className='h-6 w-20 bg-gray-300'></div>
                  <div className='h-6 w-20 bg-gray-300'></div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      <div className='flex flex-col text-2xl text-black mt-6'>
        <h2>Current amount of active events: <p className='w-2 h-3 bg-gray-400'></p></h2>
        <Button>Create new event</Button>
      </div>
    </div>
  );
};

export default Loading;
