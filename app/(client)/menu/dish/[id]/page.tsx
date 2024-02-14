import { DishInfo } from '@/src/components/dish/DishInfo';
import { DishesService } from '@/src/service/dishesService';
import React from 'react';
import { AddToCartBar } from '@/src/components/dish/AddToCartBar';
import { SimilarDishes } from '@/src/components/dish/SimilarDishes';

const DishPage = async ({ params }: { params: { id: string }, }) => {

  const dish = await DishesService.fetchDish(params.id);
  const similarDishesResponse = await DishesService.fetchDishes({ queryParams: `?category=${dish.category}&limit=5` });

  return (
    <div className='relative'>
      <DishInfo {...dish} />
      <SimilarDishes similarDishes={similarDishesResponse.data} currentDish={dish} />
      <AddToCartBar {...dish} />
    </div>
  );
};


export default DishPage;
