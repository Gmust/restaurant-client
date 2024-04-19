import { MdCelebration, MdOutlineCelebration } from 'react-icons/md';

import { EventsService } from '../../../src/service/eventsService';

const EventsPage = async () => {

  const events = await EventsService.getAllEvents();

  return (
    <div className='flex items-center w-full flex-col space-y-4'>
      <div className='bg-white p-3 text-3xl font-semibold text-black flex items-center space-x-4 rounded-lg'>
        <h1> Upcoming events </h1>
        <MdOutlineCelebration size={35} />
      </div>
      <div className='flex flex-col bg-white p-3'>

      </div>
    </div>
  );
};

export default EventsPage;
