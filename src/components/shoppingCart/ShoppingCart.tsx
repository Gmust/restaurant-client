'use client';

import { Frown, Loader, PanelRightClose, ShoppingCartIcon, Sunset } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/src/store/cart-store';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/shared/Button';
import { ShoppingCartItem } from '@/src/components/shoppingCart/ShoppingCartItem';
import { useStore } from '@/src/hooks/use-store';
import { ICartStore } from '@/@types/cart';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const ShoppingCart = () => {

  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state,
  );

  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();


  if (!cartStore) return <Loader className='animate-spin' />;
  const { cart, actions: { clearCart } } = cartStore;
  const handleProceedOrder = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 9 && currentHour < 18) {
      setIsShow(false);
      router.replace('/order/order-proceed');
    } else {
      toast('We are now closed, orders from 9:00 a.m. to 5:30 p.m', { icon: <Sunset size={60} /> });
      return;
    }
  };
  return (
    <div className='flex' data-testid='shopping-cart'>
      <div className='relative'>
        <ShoppingCartIcon className='w-8 h-8 cursor-pointer ' onClick={() => {
          setIsShow(true);
        }} />
        <div
          className='absolute text-xs bg-amber-500 px-1 rounded-lg top-0.5 -right-1 select-none pointer-events-none'>{cart ? cart.cartItems.length : 0}</div>
      </div>
      {isShow && (
        <div className='fixed top-0 left-0 z-10 w-full h-full bg-black opacity-50'
             onClick={() => setIsShow(false)}></div>
      )}
      <div
        className={cn('fixed top-0 right-0 z-20 w-80 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg', {
          'translate-x-0': isShow,
        })}
      >
        <div className='px-2 pl-4 py-4 h-screen  flex flex-col justify-between text-black'>
          <div className='flex justify-between items-center'>
            <p className='text-xl font-semibold'>Your cart:</p>
            <Button className='hover:bg-transparent hover:scale-105' variant='ghost' onClick={() => setIsShow(false)}>
              <PanelRightClose color='red' />
            </Button>
          </div>
          {cart && cart.cartItems.length > 0 ?
            <div className='overflow-auto flex flex-col space-y-2 items-star h-full'>
              {cart.cartItems.map(cartItem => <ShoppingCartItem key={cartItem._id} {...cartItem} />)}
            </div>
            :
            <span className='flex items-center justify-around'>
                 <p className='text-xl'>It is lonely here</p>
                 <Frown className='w-8 h-8' />
               </span>
          }
          <div className='flex flex-col'>
            <div className='flex items-center justify-between w-full'>
              Total price: {cart ? cart.totalPrice : 0} $
            </div>
            <div className='flex flex-col space-y-1'>
              <Button size='md' variant='outlined'
                      disabled={cart == undefined || cart.cartItems.length < 1}
                      className='border-emerald-600 hover:bg-emerald-600  hover:border-emerald-600'
                      onClick={handleProceedOrder}
              >
                Order
              </Button>
              <Button size='md' variant='outlined' className='border-red-600 hover:bg-red-600  hover:border-red-600'
                      disabled={cart == undefined || cart.cartItems.length < 1} onClick={clearCart}>Empty cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

