import { IFetchSpecialtiesResponse } from '@/@types/dishes';
import { DishCard } from '@/src/components/shared/DishCard';


interface ISpecialtiesListProps {
  specialties: IFetchSpecialtiesResponse;
}

export const SpecialtiesList = ({ specialties }: ISpecialtiesListProps) => {
  return (
    <div className='grid grid-cols-1  gap-3 text-black  p-2'>
      {specialties.specialtyDishes.map(dish =>
        <DishCard {...dish} key={dish._id} />,
      )}
    </div>
  );
};

