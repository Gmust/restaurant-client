import { ArrowBigLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import React from 'react';

import { AddToCartBar } from '@/src/components/menu/menuList/dish/AddToCartBar';
import { DishInfo } from '@/src/components/menu/menuList/dish/DishInfo';
import { SimilarDishes } from '@/src/components/menu/menuList/dish/SimilarDishes';
import { Button } from '@/src/components/shared/Button';
import { DishesService } from '@/src/service/dishesService';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props,
                                       parent: ResolvingMetadata): Promise<Metadata> {
  const dish = await DishesService.fetchDish(params.id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: dish.name,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`, ...previousImages],
    },
  };
}

const DishPage = async ({ params }: { params: { id: string }, }) => {

  const dish = await DishesService.fetchDish(params.id);
  const similarDishesResponse = await DishesService.fetchDishes({ queryParams: `?category=${dish.category}&limit=5` });

  return (
    <div className='flex flex-col'>
      <Link href='/menu' className='ml-5 md:ml-10 mt-2'>
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
