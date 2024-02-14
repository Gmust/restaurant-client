import { DishInfo } from '@/src/components/dish/DishInfo';
import { DishesService } from '@/src/service/dishesService';
import React from 'react';
import { AddToCartBar } from '@/src/components/dish/AddToCartBar';
import { SimilarDishes } from '@/src/components/dish/SimilarDishes';
import { Button } from '@/src/components/shared/Button';
import Link from 'next/link';
import { ArrowBigLeft } from 'lucide-react';

const DishPage = async ({ params }: { params: { id: string }, }) => {

  const dish = await DishesService.fetchDish(params.id);
  const similarDishesResponse = await DishesService.fetchDishes({ queryParams: `?category=${dish.category}&limit=5` });

  return (
    <div className='flex flex-col'>
      <Link href='/menu' className='ml-10 mt-2'>
        <Button className='flex justify-center items-center'>
          <ArrowBigLeft />
          Menu
        </Button>
      </Link>
      <DishInfo {...dish} />
      <SimilarDishes similarDishes={similarDishesResponse.data} currentDish={dish} />
      <AddToCartBar {...dish} />
    </div>
  );
};


export default DishPage;
