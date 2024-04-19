'use client';


import Image from 'next/image';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { DishAdminCard } from '@/src/components/adminPanel/dishes/DishAdminCard';
import { Button } from '@/src/components/shared/Button';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { UpdateDeleteButtons } from '@/src/components/shared/UpdateDeleteButtons';

const Loading = () => {
  return (
    <section className='w-full text-black text-2xl px-4 py-6'>
      <div className='flex justify-between w-full space-x-4'>
        <div className='flex flex-col'>
          <div>
            <CustomInput Icon={FiSearch} />
          </div>
          {
            Array.from({ length: 8 }).map((item, index) =>
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
              </div>)
          }
        </div>
        <div>
          <p className='text-xl'>Total amount of dishes:</p>
          <Button>Create new dish</Button>
        </div>
      </div>
    </section>
  );
};

export default Loading;
