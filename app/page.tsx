import { Contacts } from '@/src/components/homePage/Contacts';
import { EventsPanel } from '@/src/components/homePage/eventsPanel/EventsPanel';
import { RestaurantImage } from '@/src/components/homePage/RestaurantImage';
import { SpecialtiesMenu } from '@/src/components/homePage/SpecialtiesMenu';
import { DishesService } from '@/src/service/dishesService';
import { EventsService } from '@/src/service/eventsService';


const Home = async () => {

  const closestEvents = await EventsService.fetchClosestEvents();
  const nearestEvents = await EventsService.fetchNearestEvents();
  const specialtiesMenu = await DishesService.fetchSpecialtiesMenu();

  return (
    <section className='mt-7'>
      <div className='flex flex-col items-center sm:flex-row w-full sm:items-start justify-center space-x-6 space-y-4 sm:space-y-0 '>
        <RestaurantImage />
        <EventsPanel closestEvents={closestEvents} nearestEvents={nearestEvents} />
      </div>
      {
        specialtiesMenu &&
        <SpecialtiesMenu specialtiesMenu={specialtiesMenu[0]} />
      }
      <Contacts />
    </section>
  );
};
export default Home;
