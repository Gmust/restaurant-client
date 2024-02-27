import { HTMLProps } from 'react';
import { cn } from '@/src/lib/utils';

interface ChairProps {
  isAvailable: boolean,
  className?: HTMLProps<HTMLElement>['className']
}

export const Chair = ({ isAvailable, className }: ChairProps) => {
  return (
    <div className={cn(`size-10 border-2 border-gray-400 bg-white cursor-pointer ${className ? className : ''}`, {
      'group-hover:bg-gray-300 transition duration-300 cursor-pointer`': isAvailable,
      'group-hover:bg-red-300 transition duration-300 cursor-not-allowed': !isAvailable,
    })}>
      <div className='sr-only'>chair</div>
    </div>
  );
};

