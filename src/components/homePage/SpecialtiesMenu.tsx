import Link from 'next/link';

import { IFetchSpecialtiesResponse } from '@/@types/dishes';
import { Button } from '@/src/components/shared/Button';
import { DishCard } from '@/src/components/shared/DishCard';

interface ISpecialtiesMenuProps {
  specialtiesMenu: IFetchSpecialtiesResponse;
}

export const SpecialtiesMenu = ({ specialtiesMenu }: ISpecialtiesMenuProps) => {

  return (
    <div className='animate-fadeInBottom grid grid-cols-1 justify-items-center space-y-6 mt-12'>
      <h2 className='text-2xl'>Specialties menu</h2>
      <ul className='grid  grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-20'>
        {specialtiesMenu.specialtyDishes.map(menuItem => <DishCard {...menuItem} key={menuItem._id} />)}
      </ul>
      <Link href='/dishes' as='/menu'>
        <Button>
          Whole menu
        </Button>
      </Link>
    </div>
  );
};

