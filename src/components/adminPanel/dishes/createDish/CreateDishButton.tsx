'use client';

import { useState } from 'react';

import { IDish } from '@/@types/dishes';
import { IIngredient } from '@/@types/ingredients';
import { CreateDishModal } from '@/src/components/adminPanel/dishes/createDish/CreateDishModal';
import { Button } from '@/src/components/shared/Button';


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

