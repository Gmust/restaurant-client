'use client';

import { Frown, PanelRightClose, ShoppingCartIcon } from 'lucide-react';
import { useState } from 'react';
import { userCartStore } from '@/src/store/cart-store';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/shared/Button';
import { ShoppingCartItem } from '@/src/components/shoppingCart/ShoppingCartItem';

export const ShoppingCart = () => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const { cart, actions } = userCartStore();

  return (
    <div className='flex'>
      <div className='relative'>
        <ShoppingCartIcon className='w-8 h-8 cursor-pointer ' onClick={() => {
          setIsShow(true);
        }} />
        <div className='absolute text-xs bg-amber-500 px-1 rounded-lg top-0.5 -right-1'>{cart.cartItems.length}</div>
      </div>
      <div
        className={cn('fixed top-0 right-0 z-20 w-72 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg', {
          'translate-x-0': isShow,
        })}
      >
        <div className='px-6 py-4  flex flex-col justify-between text-black'>
          <div className='flex justify-between items-center'>
            <p className='text-xl font-semibold'>Your cart:</p>
            <Button className='hover:bg-transparent hover:scale-105' variant='ghost' onClick={() => setIsShow(false)}>
              <PanelRightClose color='red' />
            </Button>
          </div>
          <div className='flex flex-col space-y-2'>
            {cart.cartItems.length > 0 ?
              cart.cartItems.map(cartItem => <ShoppingCartItem {...cartItem} />)
              :
              <span className='flex items-center justify-around'>
                <p className='text-xl'>It is lonely here</p>
                <Frown className='w-8 h-8' />
              </span>
            }
          </div>
          <div className=''>
            Total price: {cart.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

