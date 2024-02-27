import { ITable } from '@/@types/tables';
import { cn } from '@/src/lib/utils';
import { Chair } from '@/src/components/booking/tables/Chair';


export const FirstTable = ({ tableNum, isAvailable, numberOfSeats }: ITable) => {
  return (
    <div className='flex flex-col items-center absolute ml-1 space-y-0.5 group'>
      <Chair isAvailable={isAvailable} />
      <div className={cn('border-2 border-gray-400 bg-white size-12', {
        'group-hover:bg-gray-300 transition duration-300 cursor-pointer': isAvailable,
        'group-hover:bg-red-300 transition duration-300 cursor-not-allowed': !isAvailable,
      })}>
        <div className='sr-only'>table</div>
      </div>
      <Chair isAvailable={isAvailable} />
    </div>
  );
};

