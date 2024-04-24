import React from 'react';

import { IDish } from '@/@types/dishes';
import { DishCard } from '@/src/components/shared/DishCard';


interface ISimilarDishesProps {
  similarDishes: IDish[],
  currentDish: IDish
}

export const SimilarDishes = ({ currentDish, similarDishes }: ISimilarDishesProps) => {
  return (
    <section className='mx-10 flex flex-col mt-3'>
      <h3 className='text-2xl font-semibold'>You may also like:</h3>
      <div className='flex  overflow-auto py-4  space-x-6 snap-x'>
        {similarDishes.filter(dish => dish._id != currentDish._id).map(dish =>
          <div className='w-full snap-center' key={dish._id}><DishCard {...dish} key={dish._id} /></div>,
        )}
      </div>
    </section>
  );
};

