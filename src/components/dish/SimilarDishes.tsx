import { IDish } from '@/@types/dishes';
import React from 'react';
import { DishCard } from '@/src/components/shared/DishCard';


interface ISimilarDishesProps {
  similarDishes: IDish[],
  currentDish: IDish
}

export const SimilarDishes = ({ currentDish, similarDishes }: ISimilarDishesProps) => {
  return (
    <section className='mx-10 flex flex-col mt-3'>
      <h3 className='text-2xl font-semibold'>You may also like:</h3>
      <div className='flex flex-row overflow-auto py-4 space-x-9'>
        {similarDishes.filter(dish => dish._id != currentDish._id).map(dish =>
          <DishCard {...dish} />,
        )}
      </div>
    </section>

  );
};

