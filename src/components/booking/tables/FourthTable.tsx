'use client';

import { useState } from 'react';

import { ITable } from '@/@types/tables';
import { BookingInfo } from '@/src/components/booking/BookingInfo';
import { Chair } from '@/src/components/booking/tables/Chair';
import { Modal } from '@/src/components/shared/Modal';

export const FourthTable = ({ tableNum, numberOfSeats }: ITable) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='group space-y-0.5 flex flex-col py-2' onClick={()=> setIsActive(true)}>
        <Chair className='ml-4' />
        <div className='flex items-center space-x-0.5'>
          <div
            className={'border-2 border-gray-400 bg-white w-20 h-12 group-hover:bg-gray-300 transition duration-300 cursor-pointer'}>
            <div className='sr-only'>table</div>
            <div className='z-10 text-xl text-black'>{tableNum}</div>
          </div>
          <Chair />
        </div>
        <Chair className='ml-4' />
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <BookingInfo tableNum={tableNum} numberOfSeats={numberOfSeats} setIsActive={setIsActive} />
      </Modal>
    </>
  );
};

