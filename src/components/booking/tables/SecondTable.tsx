'use client';

import { useState } from 'react';

import { ITable } from '@/@types/tables';
import { BookingInfo } from '@/src/components/booking/BookingInfo';
import { Chair } from '@/src/components/booking/tables/Chair';
import { Modal } from '@/src/components/shared/Modal';
import { cn } from '@/src/lib/utils';

export const SecondTable = ({ tableNum, numberOfSeats}: ITable) => {

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='ml-1 flex flex-col absolute space-y-0.5 items-center group' onClick={()=> setIsActive(true)}>
        <div className='flex space-x-8'>
          <Chair />
          <Chair />
        </div>
        <div>
          <div className={'border-2 border-gray-400 bg-white w-32 h-12 group-hover:bg-gray-300 transition duration-300 cursor-pointer'}>
            <div className='sr-only'>table</div>
            <div className='z-10 text-xl text-black'>{tableNum}</div>
          </div>
        </div>
        <div className='flex space-x-8'>
          <Chair  />
          <Chair  />
        </div>
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <BookingInfo tableNum={tableNum} numberOfSeats={numberOfSeats} setIsActive={setIsActive}/>
      </Modal>
    </>
  );
};

