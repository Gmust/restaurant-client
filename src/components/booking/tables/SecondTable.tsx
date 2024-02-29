'use client';

import { ITable } from '@/@types/tables';
import { Chair } from '@/src/components/booking/tables/Chair';
import { cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/shared/Modal';
import { useState } from 'react';

export const SecondTable = ({ tableNum, numberOfSeats}: ITable) => {

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='ml-1 flex flex-col absolute space-y-0.5 items-center group'>
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
        <div></div>
      </Modal>
    </>
  );
};

