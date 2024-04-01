'use client';

import { IDish } from '@/@types/dishes';
import { IIngredient } from '@/@types/ingredients';
import { Button } from '@/src/components/shared/Button';
import { CreateDishModal } from '@/src/components/adminPanel/dishes/createDish/CreateDishModal';
import { useState } from 'react';


interface ICreateDishButtonProps {
  allDishes: IDish[],
  allIngredients: IIngredient[]
}

export const CreateDishButton = ({ allDishes, allIngredients }: ICreateDishButtonProps) => {

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div>
        <p className='text-xl'>Total amount of dishes: {allDishes.length}</p>
        <Button onClick={() => setIsActive(true)}>Create new dish</Button>
      </div>
      <CreateDishModal isActive={isActive} setIsActive={setIsActive} allIngredients={allIngredients} />
    </>
  );
};

