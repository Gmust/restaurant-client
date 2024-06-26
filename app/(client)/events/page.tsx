import { Metadata } from 'next';
import { MdOutlineCelebration } from 'react-icons/md';

import { EventInfoCard } from '@/src/components/events/EventInfoCard';

import { EventsService } from '../../../src/service/eventsService';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Check out our closest events',
};

const EventsPage = async () => {

  const events = await EventsService.getAllEvents();

  return (
    <div className='flex items-center w-full flex-col space-y-4'>
      <div className='bg-white p-3 text-3xl font-semibold text-black flex items-center space-x-4 rounded-lg'>
        <h1> Upcoming events </h1>
        <MdOutlineCelebration size={35} />
      </div>
      <div className='flex flex-col  p-3'>
        {events.length > 0 ?
          events.map(event => <EventInfoCard {...event} key={event._id} />)
          : <div></div>}
      </div>
    </div>
  );
};

export default EventsPage;
