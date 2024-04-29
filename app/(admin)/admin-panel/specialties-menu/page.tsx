import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { NewSpecialtiesMenu } from '@/src/components/adminPanel/specialties-menu/NewSpecialtiesMenu';
import { SpecialtiesList } from '@/src/components/adminPanel/specialties-menu/SpecialtiesList';

import { DishesService } from '../../../../src/service/dishesService';

export const metadata: Metadata = {
  title: 'Specialties Menu',
  description: 'Specialties Menu',
};


const SpecialtiesMenuPage = async () => {

  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }

  const specialties = await DishesService.fetchSpecialtiesMenu();
  const allDishes = await DishesService.getAllDishes(token);

  return (
    <section className='flex mx-8 text-2xl py-4'>
      <div>
        <h2 className='font-semibold text-black'>Current specialties menu:</h2>
        <SpecialtiesList specialties={specialties[0]} />
      </div>
      <div>
        <h2 className='font-semibold text-black'>Create new specialties menu:</h2>
        {allDishes &&
          <NewSpecialtiesMenu dishes={allDishes} />
        }
      </div>
    </section>
  );
};

export default SpecialtiesMenuPage;

