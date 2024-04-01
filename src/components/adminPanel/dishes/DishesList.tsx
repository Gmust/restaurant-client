'use client';

import { IDish } from '@/@types/dishes';
import { useEffect, useState } from 'react';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { FiSearch } from 'react-icons/fi';
import { DishAdminCard } from '@/src/components/adminPanel/dishes/DishAdminCard';
import { IIngredient } from '@/@types/ingredients';
import { useAdminDishesStore } from '@/src/store/admin-dishes-store';

interface IDishesListProps {
  initialDishes: IDish[];
  allIngredients: IIngredient[];
}

export const DishesList = ({ initialDishes, allIngredients }: IDishesListProps) => {


  const [ddishes, setDishes] = useState<IDish[]>(initialDishes);
  const { dishes, actions } = useAdminDishesStore();

  useEffect(() => {
    actions.setDishes(initialDishes);
  }, []);


  return (
    <div className='flex flex-col'>
      <div>
        <CustomInput Icon={FiSearch} />
      </div>
      <div className='grid grid-cols-2 overflow-y-auto  gap-2 p-2 max-h-[550px]'>
        {dishes.map(dish =>
          <DishAdminCard dishes={dishes} dish={dish} key={dish._id} allIngredients={allIngredients}
                         setDishes={setDishes} />,
        )}
      </div>
    </div>
  );
};

