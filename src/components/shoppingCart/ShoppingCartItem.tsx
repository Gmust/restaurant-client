'use client';

import { ICartItem } from '@/@types/cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, Trash } from 'lucide-react';
import { Button } from '@/src/components/shared/Button';
import { useCartStore } from '@/src/store/cart-store';

export const ShoppingCartItem = ({ _id, dish, quantity: initialQuantity }: ICartItem) => {

  const { actions: { updateCartItem, removeFromCart } } = useCartStore();
  const [quantity, setQuantity] = useState<number>(initialQuantity);


  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddQuantity = () => {
    updateCartItem(dish, quantity + 1);
    setQuantity((prevState) => {
      return prevState + 1;
    });
  };

  const handleReduceQuantity = () => {
    updateCartItem(dish, quantity - 1);
    setQuantity((prevState) => {
      if (prevState <= 1) {
        return prevState;
      }
      return prevState - 1;
    });
  };

  return (
    <div className='flex justify-between w-full'>
      <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} alt={dish.name} width={50}
             height={50} draggable={false} />
      <div className='flex flex-col space-x-1 '>
        <p className='line-clamp-1'>{dish.name}</p>
        <div className='flex items-center justify-center space-x-1'>
          <ArrowBigLeft className='cursor-pointer' onClick={handleReduceQuantity} />
          <p className='text-lg font-semibold px-1 py-2'>{quantity}</p>
          <ArrowBigRight className='cursor-pointer' onClick={handleAddQuantity} />
        </div>

      </div>
      <div className='text-lg font-semibold flex flex-col'>
        {dish.price * quantity}$
        <Button variant='outlined' className='border-red-500 hover:border-red-500 py-0 px-1'
                onClick={() => removeFromCart(dish)}>
          <Trash color='red' />
        </Button>
      </div>
    </div>
  );
};

