'use client';

import { useState } from 'react';

import { AdminEventCard } from '@/src/components/adminPanel/events/AdminEventCard';
import { CreateEventModal } from '@/src/components/adminPanel/events/CreateEventModal';
import { EventCard } from '@/src/components/homePage/eventsPanel/EventCard';
import { Button } from '@/src/components/shared/Button';

interface IEventsListProps {
  events: IEvent[];
}

export const EventsList = ({ events: initialEvents }: IEventsListProps) => {

  const [events, setEvents] = useState<IEvent[]>(initialEvents);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='flex justify-between p-3'>
        <div className='flex flex-col items-start w-1/2'>
          <h2 className='text-3xl text-black font-semibold'>Current events:</h2>
          {
            events.length > 0 ?
              <div className='flex flex-col w-full'>
                {events.map(event => <AdminEventCard event={event} setEvents={setEvents} events={events}
                                                     key={event._id} />)}
              </div>
              :
              <div className='flex items-center justify-center'>
                <p className='text-2xl font-semibold text-black'>There are no events at the moment...</p>
              </div>
          }
        </div>
        <div className='flex flex-col text-2xl text-black mt-6'>
          <h2>Current amount of active events: {events.length}</h2>
          <Button onClick={() => setIsActive(true)}>Create new event</Button>
        </div>
      </div>
      <CreateEventModal setIsActive={setIsActive} isActive={isActive} setEvents={setEvents} />
    </>
  );
};

