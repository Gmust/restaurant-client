'use client';

import { Button } from '@/src/components/shared/Button';
import { useState } from 'react';
import { EventCard } from '@/src/components/homePage/eventsPanel/EventCard';
import { AdminEventCard } from '@/src/components/adminPanel/events/AdminEventCard';
import { CreateEventModal } from '@/src/components/adminPanel/events/CreateEventModal';

interface IEventsListProps {
  events: IEvent[];
}

export const EventsList = ({ events: initialEvents }: IEventsListProps) => {

  const [events, setEvents] = useState<IEvent[]>(initialEvents);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='flex justify-between p-3'>
        <>
          {
            events.length > 0 ?
              <div className='flex flex-col'>
                {events.map(event => <AdminEventCard event={event} setEvents={setEvents} events={events}
                                                     key={event._id} />)}
              </div>
              :
              <div className='flex items-center justify-center'>
                <p className='text-2xl font-semibold text-black'>There are no events at the moment...</p>
              </div>
          }
        </>
        <div className='flex w-1/4 justify-center items-center text-2xl'>
          <Button onClick={() => setIsActive(true)}>Create new event</Button>
        </div>
      </div>
      <CreateEventModal setIsActive={setIsActive} isActive={isActive} setEvents={setEvents} />
    </>
  );
};

