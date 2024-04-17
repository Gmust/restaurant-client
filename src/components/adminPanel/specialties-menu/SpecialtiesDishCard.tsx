import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IDish } from '@/@types/dishes';
import { IIngredient } from '@/@types/ingredients';
import { cn } from '@/src/lib/utils';


interface ISpecialtiesDishCardProps {
  dish: IDish,
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
}

export const SpecialtiesDishCard = ({
                                      isDragging, handleDragging, dish,
                                    }: ISpecialtiesDishCardProps) => {


  const handleDragEnd = () => handleDragging(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${dish._id}`);
    handleDragging(true);
  };

  return (
    <div onDragEnd={handleDragEnd} onDragStart={handleDragStart} draggable={true}
         className={cn('cursor-pointer  text-black w-[310px] h-[110px] flex flex-row space-x-3 bg-inherit hover:scale-105 transition duration-200 shadow-md border-2 border-[#591d25] p-1',{
           'opacity-60':isDragging
         })}
    >
      <Image width={70} height={50}
             src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`}
             alt={dish.name}
             draggable={false} className='rounded-sm' />
      <div className='flex flex-col w-full'>
        <div className='flex flex-row  justify-between'>
          <div className='flex flex-col'>
            <h3 className='text-xl'>{dish.name}</h3>
            <p className='text-amber-500'>{dish.dishWeight} gr</p>
          </div>
          <div className='flex flex-col'>
            <span className='border-2 border-amber-400 flex justify-center items-center h-10 p-1 '>{dish.price}$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

