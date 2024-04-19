'use client'

import { useState } from 'react';

import { ITable } from '@/@types/tables';
import { BookingInfo } from '@/src/components/booking/BookingInfo';
import { Chair } from '@/src/components/booking/tables/Chair';
import { Modal } from '@/src/components/shared/Modal';

export const ThirdTable = ({ tableNum, numberOfSeats }: ITable) => {
  const [isActive, setIsActive] = useState<boolean>(false);


  return (
    <>
      <div className='group absolute flex flex-col space-y-0.5 items-center mt-1' onClick={()=> setIsActive(true)}>
        <div className='flex justify-between space-x-4'>
          <Chair />
          <Chair />
          <Chair />
        </div>
        <div>
          <div
            className='border-2 border-gray-400 bg-white w-40 h-20 group-hover:bg-gray-300 transition duration-300 cursor-pointer'>
            <div className='sr-only'>table</div>
            <div className='z-10 text-xl text-black'>{tableNum}</div>
          </div>
        </div>
        <div className='flex justify-between space-x-4'>
          <Chair />
          <Chair />
          <Chair />
        </div>
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <BookingInfo tableNum={tableNum} numberOfSeats={numberOfSeats} setIsActive={setIsActive}/>
      </Modal>
    </>

  );
};

