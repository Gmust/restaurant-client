import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { EventsList } from '@/src/components/adminPanel/events/EventsList';
import { EventsService } from '@/src/service/eventsService';

export const metadata: Metadata = {
  title: 'Events Page',
  description: 'Events page',
};

const EventsPage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }
  const events = await EventsService.getAllEvents();

  return (
    <div>
      {
        events ?
          <EventsList events={events} />
          :
          <div>Error....</div>
      }
    </div>
  );
};

export default EventsPage;
