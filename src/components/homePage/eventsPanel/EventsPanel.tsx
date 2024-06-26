'use client';

import { useState } from 'react';

import { EventCard } from '@/src/components/homePage/eventsPanel/EventCard';
import { Button } from '@/src/components/shared/Button';
import { cn } from '@/src/lib/utils';


export interface IEventsProps {
  closestEvents: IEvent[];
  nearestEvents: IEvent[];
}

export const EventsPanel = ({ nearestEvents, closestEvents }: IEventsProps) => {

  const [showEvents, setShowEvents] = useState<IEvent[]>(closestEvents);

  return (
    <div className='animate-fadeInRight' data-testid='events-panel'>
    <span className='flex text-xl'>
      <Button onClick={() => setShowEvents(closestEvents)}
              className={cn('w-full rounded-b-none rounded-r-none active:scale-100', {
                'bg-amber-900': showEvents === closestEvents,
              })}>
        Closest
      </Button>
      <Button onClick={() => setShowEvents(nearestEvents)}
              className={cn('w-full rounded-b-none rounded-l-none active:scale-100', {
                'bg-amber-900': showEvents === nearestEvents,
              })}>
        Nearest
      </Button>
    </span>
      <div className='text-lg bg-amber-900 rounded-b-md lg:w-[600px] lg:h-[395px] w-[300px] h-[280px]'>
        <div>
          {
            showEvents.length <= 0 &&
            <div className='text-2xl'>
              <p className='flex w-full items-center p-12 sm:p-24 sm:break-all'>
                No events available at the moment
              </p>
            </div>
          }
        </div>
        {
          showEvents.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 '>
            {
              showEvents.slice(0, 3).map(event => <EventCard {...event} key={event.name} />)
            }
          </div>
        }
      </div>
    </div>
  );
};

