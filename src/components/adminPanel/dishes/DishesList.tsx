'use client';

import { IDish } from '@/@types/dishes';
import React, { useEffect, useState } from 'react';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { FiSearch } from 'react-icons/fi';
import { DishAdminCard } from '@/src/components/adminPanel/dishes/DishAdminCard';
import { IIngredient } from '@/@types/ingredients';
import { useAdminDishesStore } from '@/src/store/admin-dishes-store';
import toast from 'react-hot-toast';
import { DishesService } from '@/src/service/dishesService';

interface IDishesListProps {
  initialDishes: IDish[];
  allIngredients: IIngredient[];
}

export const DishesList = ({ initialDishes, allIngredients }: IDishesListProps) => {

  const { dishes, actions } = useAdminDishesStore();


  useEffect(() => {
    actions.setDishes(initialDishes);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await DishesService.getDishesByTerm(e.target.value);
      console.log(response);
      actions.setDishes(response);
    } catch (e) {
      toast.error('Something went wrong');
    }
  };


  return (
    <div className='flex flex-col'>
      <div>
        <CustomInput Icon={FiSearch} onChange={handleSearch} />
      </div>
      <div className='grid grid-cols-2 overflow-y-auto  gap-2 p-2 max-h-[550px]'>
        {dishes.map(dish =>
          <DishAdminCard dishes={dishes} dish={dish} key={dish._id} allIngredients={allIngredients} />,
        )}
      </div>
    </div>
  );
};

