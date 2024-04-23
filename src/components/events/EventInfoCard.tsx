'use client';

import { useState } from 'react';

import { Button } from '@/src/components/shared/Button';
import { cn } from '@/src/lib/utils';
import { fromISOSToReadable } from '@/src/utils/fromISOSToReadable';

export const EventInfoCard = ({ _id, name, endDate, startDate, description }: IEvent) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <article className='flex flex-col text-xl'>
      <h3 className='text-2xl font-semibold'>{name}</h3>
      <div className='flex flex-col flex-between'>
        <p>Starts at: {fromISOSToReadable(startDate)}</p>
        <p>Ends at: {fromISOSToReadable(endDate)}</p>
      </div>
      <button className='items-end text-amber-400' onClick={() => setIsExpanded(!isExpanded)}>
        More info
      </button>
      <div className={cn('text-xl animate-fadeInTop', {
        'hidden animate-fadeInBottom': !isExpanded,
      })}>
        {description}
      </div>
    </article>
  );
};

