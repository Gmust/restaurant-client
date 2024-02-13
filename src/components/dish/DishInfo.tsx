import { IDish } from '@/@types/dishes';
import Image from 'next/image';
import React from 'react';
import { Vegan } from 'lucide-react';
import { cn, showDishCategoryIcon } from '@/src/lib/utils';
import { Tooltip } from '@/src/components/shared/Tooltip';


export const DishInfo = (dish: IDish) => {

  const Icon = showDishCategoryIcon(dish.category);

  return (
    <div className='flex flex-row justify-around mx-10 mt-6'>
      <div className='relative w-96 h-96'>
        <Image alt={dish.name} fill src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`}
               className='rounded-sm' />
      </div>
      <div className='flex flex-col space-y-3'>
        <span className='flex items-center space-x-4'>
          <h1 className='text-3xl font-medium'>{dish.name}</h1>
          <p className='border border-amber-500 px-2 py-1'>{dish.dishWeight} gr</p>
          <Tooltip tooltipText={`Dish category ${dish.category}`} position='top'>
            <Icon className='w-8 h-8 hover:animate-bounce' color='#81586e' />
          </Tooltip>
          <Tooltip tooltipText={dish.isVegan ? 'This dish is for vegans' : 'This dish is not for vegans'}
                   position='top'>
             <div className='relative inline-block'>
                <Vegan color='#3e9392'
                       className={cn('w-7 h-7', {
                         'hover:animate-bounce': dish.isVegan,
                       })} />
               {!dish.isVegan &&
                 <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-700'>
                <span style={{
                  transform: 'rotate(45deg)',
                  width: '28px',
                  height: '2px',
                  backgroundColor: 'currentColor',
                }} />
                 </div>
               }
          </div>
          </Tooltip>
        </span>
        <section className='flex text-xl flex-row'>
          <p className='break-words max-w-4xl'>{dish.description}</p>
        </section>
      </div>
    </div>
  );
};

