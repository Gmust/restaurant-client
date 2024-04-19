'use client';

import { useState } from 'react';

import { ITable } from '@/@types/tables';
import { BookingInfo } from '@/src/components/booking/BookingInfo';
import { Chair } from '@/src/components/booking/tables/Chair';
import { Modal } from '@/src/components/shared/Modal';
import { cn } from '@/src/lib/utils';


export const FirstTable = ({ tableNum,  numberOfSeats }: ITable) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-col items-center absolute ml-1 space-y-0.5 group' onClick={()=> setIsActive(true)}>
        <Chair/>
        <div className='border-2 border-gray-400 bg-white size-12 group-hover:bg-gray-300 transition duration-300 cursor-pointer'>
          <div className='sr-only'>table</div>
          <div className='z-10 text-xl text-black'>{tableNum}</div>
        </div>
        <Chair />
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <BookingInfo tableNum={tableNum} numberOfSeats={numberOfSeats} setIsActive={setIsActive}/>
      </Modal>
    </>
  );
};

