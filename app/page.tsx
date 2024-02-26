import { RestaurantImage } from '@/src/components/homePage/RestaurantImage';
import { EventsPanel } from '@/src/components/homePage/eventsPanel/EventsPanel';
import { EventsService } from '@/src/service/eventsService';
import { DishesService } from '@/src/service/dishesService';
import { SpecialtiesMenu } from '@/src/components/homePage/SpecialtiesMenu';
import { Contacts } from '@/src/components/homePage/Contacts';


const Home = async () => {

  const closestEvents = await EventsService.fetchClosestEvents();
  const nearestEvents = await EventsService.fetchNearestEvents();
  const specialtiesMenu = await DishesService.fetchSpecialtiesMenu();

  return (
    <section className='mt-7'>
      <div className='flex w-full items-start justify-center space-x-6'>
        <RestaurantImage />
        <EventsPanel closestEvents={closestEvents} nearestEvents={nearestEvents} />
      </div>
      <div>test</div>
      {
        specialtiesMenu &&
        <SpecialtiesMenu specialtiesMenu={specialtiesMenu[0]} />
      }
      <Contacts />
    </section>
  );
};
export default Home;
