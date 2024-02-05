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
                         }: IDish) => {
  return (
    <Link
      href={`/dish/${_id}`}
      as={`/dish/${name.split(' ').join('-').toLowerCase()}`}
      className='flex flex-row space-x-3 bg-inherit hover:scale-105 transition duration-200 shadow-md border-2 border-[#591d25]'
    >
      <Image width={70} height={50} src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${image}`} alt={name}
             draggable={false} />
      <div className='flex flex-col '>
        <div className='flex space-x-16'>
          <div className='flex flex-col'>
            <h3 className='text-xl'>{name}</h3>
            <p className='text-amber-500'>100 gr</p>
          </div>
          <span className='border-2 border-amber-400 flex justify-center items-center h-10 p-1 '>{price}$</span>
        </div>
        <p>
          {description}
        </p>
      </div>
    </Link>
  );
};

