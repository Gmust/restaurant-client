import { Chair } from '@/src/components/booking/tables/Chair';
import { ITable } from '@/@types/tables';
import { cn } from '@/src/lib/utils';

export const ThirdTable = ({ tableNum, isAvailable, numberOfSeats }: ITable) => {
  return (
    <div className='group absolute flex flex-col space-y-0.5 items-center mt-1'>
      <div className='flex justify-between space-x-4'>
        <Chair isAvailable={isAvailable} />
        <Chair isAvailable={isAvailable} />
        <Chair isAvailable={isAvailable} />
      </div>
      <div>
        <div className={cn('border-2 border-gray-400 bg-white w-40 h-20', {
          'group-hover:bg-gray-300 transition duration-300 cursor-pointer': isAvailable,
          'group-hover:bg-red-300 transition duration-300 cursor-not-allowed': !isAvailable,
        })}>
          <div className='sr-only'>table</div>
        </div>
      </div>
      <div className='flex justify-between space-x-4'>
        <Chair isAvailable={isAvailable} />
        <Chair isAvailable={isAvailable} />
        <Chair isAvailable={isAvailable} />
      </div>
    </div>
  );
};

