import { ITable } from '@/@types/tables';
import { Chair } from '@/src/components/booking/tables/Chair';
import { cn } from '@/src/lib/utils';

export const FifthTable = ({ tableNum, numberOfSeats }: ITable) => {
  return (
    <div className='group flex items-center space-x-0.5'>
      <Chair  />
      <div className='border-2 border-gray-400 bg-white w-14 h-14group-hover:bg-gray-300 transition duration-300 cursor-pointer'>
        <div className='sr-only'>table</div>
        <div className='z-10 text-xl text-black'>{tableNum}</div>
      </div>
      <Chair/>
    </div>
  );
};

