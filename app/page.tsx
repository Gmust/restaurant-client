import { EventsService } from '@/src/service/eventsService';
import { RestaurantImage } from '@/src/components/homePage/RestaurantImage';
import { EventsPanel } from '@/src/components/homePage/eventsPanel/EventsPanel';

const Home = async () => {
  const closestEvents = await EventsService.fetchClosestEvents();
  const nearestEvents = [] as IEvent[]
  return (
    <section className='flex mt-7'>
      <div className='flex w-full items-start justify-center space-x-6'>
        <RestaurantImage />
        <EventsPanel closestEvents={closestEvents} nearestEvents={nearestEvents} />
      </div>
    </section>
  );
};
export default Home;
