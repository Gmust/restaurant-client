import { Chair } from '@/src/components/booking/tables/Chair';
import { ITable } from '@/@types/tables';
import { cn } from '@/src/lib/utils';

export const ThirdTable = ({ tableNum, numberOfSeats }: ITable) => {
  return (
    <div className='group absolute flex flex-col space-y-0.5 items-center mt-1'>
      <div className='flex justify-between space-x-4'>
        <Chair/>
        <Chair />
        <Chair  />
      </div>
      <div>
        <div className='border-2 border-gray-400 bg-white w-40 h-20 group-hover:bg-gray-300 transition duration-300 cursor-pointer'>
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
  );
};

