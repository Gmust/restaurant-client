import React, { ReactNode } from 'react';

import { cn } from '@/src/lib/utils';


interface ITooltipProps {
  children: ReactNode,
  tooltipText: string,
  position: 'right' | 'top' | 'bottom' | 'left',
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Tooltip = ({ tooltipText, position, children, textSize }: ITooltipProps) => {
  return (
    <>
      <div className='group relative inline-block'>
        <button className='inline-flex rounded bg-primary text-base font-semibold text-white'>
          {children}
        </button>
        <div
          className={cn('whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100', {
            'absolute right-full top-1/2 z-20 mr-2 -translate-y-1/2': position === 'left',
            'absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2': position === 'right',
            'absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2': position === 'top',
            'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 ': position === 'bottom',
          })}>
            <span className={cn('rotate-45 rounded-sm bg-black', {
              'absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black': position === 'left',
              'absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black': position === 'right',
              'absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black': position === 'top',
              'absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black': position === 'bottom',
            })}></span>
          <span className={textSize ? `text-${textSize}` : 'text-sm'}>{tooltipText}</span>
        </div>
      </div>
    </>
  );
};
