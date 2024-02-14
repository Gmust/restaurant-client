import { IDish } from '@/@types/dishes';
import Image from 'next/image';
import Link from 'next/link';

export const DishCard = ({
                           _id,
                           image,
                           description,
                           ingredients,
                           isVegan,
                           name,
                           preparationTime,
                           price,
                           isAvailable,
                           category,
                           dishWeight,
                         }: IDish) => {
  return (
    <Link
      href={`/menu/dish/${_id}`}
      className='w-[310px] h-[110px] flex flex-row space-x-3 bg-inherit hover:scale-105 transition duration-200 shadow-md border-2 border-[#591d25] p-1'
    >
      <Image width={70} height={50}
             src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
             alt={name}
             draggable={false} className='rounded-sm' />
      <div className='flex flex-col w-full'>
        <div className='flex flex-row  justify-between'>
          <div className='flex flex-col'>
            <h3 className='text-xl'>{name}</h3>
            <p className='text-amber-500'>{dishWeight} gr</p>
          </div>
          <div className='flex flex-col'>
            <span  className='border-2 border-amber-400 flex justify-center items-center h-10 p-1 '>{price}$</span>
          </div>
        </div>
        <p className='line-clamp-2'>
          {description}
        </p>
      </div>
    </Link>
  );
};

