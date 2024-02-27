import { ITable } from '@/@types/tables';
import { cn } from '@/src/lib/utils';
import { Chair } from '@/src/components/booking/tables/Chair';

export const FourthTable = ({ tableNum, numberOfSeats, isAvailable }: ITable) => {
  return (
    <div className='group space-y-0.5 flex flex-col py-2'>
      <Chair isAvailable={isAvailable} className='ml-4' />
      <div className='flex items-center space-x-0.5'>
        <div className={cn('border-2 border-gray-400 bg-white w-20 h-12', {
          'group-hover:bg-gray-300 transition duration-300 cursor-pointer': isAvailable,
          'group-hover:bg-red-300 transition duration-300 cursor-not-allowed': !isAvailable,
        })}>
          <div className='sr-only'>table</div>
        </div>
        <Chair isAvailable={isAvailable} />
      </div>
      <Chair isAvailable={isAvailable} className='ml-4' />
    </div>
  );
};

