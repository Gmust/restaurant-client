import { DishCard } from '@/src/components/shared/DishCard';
import { Button } from '@/src/components/shared/Button';
import { Edit2, Trash } from 'lucide-react';
import { IDish } from '@/@types/dishes';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChangeDishModal } from '@/src/components/adminPanel/dishes/ChangeDishModal';

interface IDishAdminCardProps {
  dish: IDish;
}

export const DishAdminCard = ({ dish }: IDishAdminCardProps) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <div className='text-sm flex  space-x-1 rounded-md border-2 border-gray-400 p-2'>
        <div
          className='w-[310px] h-[110px] flex flex-row space-x-3 bg-inherit '
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
              <span
                className='border-2 border-amber-400 flex justify-center items-center h-10 p-1 '>{dish.price}$</span>
              </div>
            </div>
            <p className='line-clamp-2'>
              {dish.description}
            </p>
          </div>
        </div>
        <div className='flex flex-col space-y-6'>
          <Button className='bg-emerald-700 hover:bg-emerald-800' onClick={() => setIsEdit(true)}>
            <Edit2 />
          </Button>
          <Button className='bg-red-600 hover:bg-red-800' onClick={() => setIsDelete(true)}>
            <Trash />
          </Button>
        </div>
      </div>
      <ChangeDishModal dish={dish} setIsActive={setIsEdit} isActive={isEdit}/>
    </>
  );
};

