import { ITable } from '@/@types/tables';
import { Chair } from '@/src/components/booking/tables/Chair';
import { cn } from '@/src/lib/utils';

export const FifthTable = ({ tableNum, numberOfSeats, isAvailable }: ITable) => {
  return (
    <div className='group flex items-center space-x-0.5'>
      <Chair isAvailable={isAvailable} />
      <div className={cn('border-2 border-gray-400 bg-white w-14 h-14', {
        'group-hover:bg-gray-300 transition duration-300 cursor-pointer': isAvailable,
        'group-hover:bg-red-300 transition duration-300 cursor-not-allowed': !isAvailable,
      })}>
        <div className='sr-only'>table</div>
      </div>
      <Chair isAvailable={isAvailable} />
    </div>
  );
};

