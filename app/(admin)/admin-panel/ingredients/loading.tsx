'use client';

import { Button } from '../../../../src/components/shared/Button';
import { capitalizeFirstLetter } from '../../../../src/lib/utils';

const Loading = () => {
  return (
    <div className='flex justify-between  space-x-8 p-4'>
      <div className='w-full flex flex-col text-black overflow-y-auto max-h-[450px] '>
        <table className='w-full text-left rtl:text-right text-gray-500 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr className='text-2xl'>
            {[...Array('name', 'quantity', 'unit', '')].map((item, index) =>
              <th key={index}>{capitalizeFirstLetter(item)}</th>,
            )}
          </tr>
          </thead>
          <tbody>
          {Array.from({ length: 6 }).map((ingredient, index) =>
            <tr className='text-xl bg-white border-b animate-pulse' key={index}>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/3 h-10 bg-gray-200 rounded'></td>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/3 h-10 bg-gray-200 rounded'></td>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/3 h-10 bg-gray-200 rounded'></td>
              <td className='px-6 py-4 font-medium text-gray-900 flex flex-col space-y-2'>
                <div className='h-8 w-24 bg-gray-200 rounded'></div>
              </td>
            </tr>,
          )}
          </tbody>
        </table>
      </div>
      <div className='flex w-1/3 mt-10 justify-center text-2xl'>
        <Button>Create ingredient</Button>
      </div>
    </div>
  );
};

export default Loading;
