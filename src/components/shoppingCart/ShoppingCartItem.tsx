'use client';

import { ICartItem } from '@/@types/cart';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

export const ShoppingCartItem = ({ _id, dish, quantity: initialQuantity }: ICartItem) => {

  const [quantity, setQuantity] = useState<number>(initialQuantity);


  return (
    <div className='flex'>
      <div className='flex justify-between'>
        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} alt={dish.name} width={50}
               height={50} />
        <p>{dish.name}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center space-x-1'>
          <ArrowBigLeft/>
          <p>{quantity}</p>
          <ArrowBigRight/>
        </div>
        <div>
          {dish.price}
        </div>
      </div>
    </div>
  );
};

