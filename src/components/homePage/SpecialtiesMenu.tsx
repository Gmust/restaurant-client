import { IDish } from '@/@types/dishes';
import { DishCard } from '@/src/components/shared/DishCard';
import { Button } from '@/src/components/shared/Button';
import Link from 'next/link';

interface ISpecialtiesMenuProps {
  specialtiesMenu: IDish[];
}

export const SpecialtiesMenu = ({ specialtiesMenu }: ISpecialtiesMenuProps) => {
  return (
      <div className='animate-fadeInBottom grid grid-cols-1 justify-items-center space-y-6 mt-12'>
        <h2 className='text-2xl'>Specialties menu</h2>
        <ul className='grid  grid-cols-2 gap-20'>
          {specialtiesMenu.map(menuItem => <DishCard {...menuItem} key={menuItem._id} />)}
        </ul>
        <Link href='/dishes' as='/menu'>
          <Button>
            Whole menu
          </Button>
        </Link>
      </div>
  );
};

