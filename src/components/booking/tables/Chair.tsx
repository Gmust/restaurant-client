import { HTMLProps } from 'react';
import { cn } from '@/src/lib/utils';

interface ChairProps {
  className?: HTMLProps<HTMLElement>['className']
}

export const Chair = ({  className }: ChairProps) => {
  return (
    <div className={`size-10 border-2 border-gray-400 bg-white cursor-pointer group-hover:bg-gray-300 transition duration-300 `}>
      <div className='sr-only'>chair</div>
    </div>
  );
};

