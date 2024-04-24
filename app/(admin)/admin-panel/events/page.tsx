import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { EventsList } from '@/src/components/adminPanel/events/EventsList';
import { IngredientsList } from '@/src/components/adminPanel/ingredients/IngredientsList';
import { Button } from '@/src/components/shared/Button';
import { EventsService } from '@/src/service/eventsService';

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
