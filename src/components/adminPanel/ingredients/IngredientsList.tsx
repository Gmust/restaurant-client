'use client';

import { Edit2, Trash } from 'lucide-react';
import { useState } from 'react';

import { IIngredient } from '@/@types/ingredients';
import { CreateIngredientModal } from '@/src/components/adminPanel/ingredients/CreateIngredientModal';
import { IngredientTableItem } from '@/src/components/adminPanel/ingredients/IngredientTableItem';
import { Button } from '@/src/components/shared/Button';
import { capitalizeFirstLetter } from '@/src/lib/utils';

interface IIngredientsList {
  ingredients: IIngredient[];
}

export const IngredientsList = ({ ingredients: initialIngredients }: IIngredientsList) => {

  const [ingredients, setIngredients] = useState<IIngredient[]>(initialIngredients);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className='flex justify-between  space-x-8 p-4'>
        <div className='w-full flex flex-col text-black overflow-y-auto max-h-[450px] '>
          <table className='w-full text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr className='text-2xl'>
              {[...Array('name', 'quantity', 'unit', '')].map((item, index) =>
                <th key={index}>{capitalizeFirstLetter(item)}</th>,
              )}
            </tr>
            </thead>
            <tbody>
            {ingredients.map(ingredient =>
              <IngredientTableItem key={ingredient._id} ingredient={ingredient} setIngredients={setIngredients}
                                   ingredients={ingredients} />,
            )}
            </tbody>
          </table>
        </div>
        <div className='flex w-1/3 mt-10 justify-center text-2xl'>
          <Button onClick={() => setIsActive(true)}>Create ingredient</Button>
        </div>
      </div>
      <CreateIngredientModal setIsActive={setIsActive} isActive={isActive} ingredients={ingredients}
                             setIngredients={setIngredients} />
    </>
  );
};

