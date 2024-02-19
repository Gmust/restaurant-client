'use client';

import { IDish } from '@/@types/dishes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { userCartStore } from '@/src/store/cart-store';
import { Button } from '@/src/components/shared/Button';

export const AddToCartBar = (dish: IDish) => {

  //const [quantity, setQuantity] = useState<number>(1);
  const { cart, actions: { addToCart, updateCartItem } } = userCartStore();
  const [isDishInCart, setIsDishInCart] = useState<boolean>(cart.cartItems.some(cartDish => cartDish._id === dish._id));

  useEffect(() => {
    setIsDishInCart(cart.cartItems.some(cartItem => cartItem.dish._id == dish._id));
  }, [cart]);

  // const { height, width } = useScreenSize();

  // const handleAddQuantity = () => {
  //   updateCartItem(dish, quantity + 1);
  //   setQuantity((prevState) => {
  //     return prevState + 1;
  //   });
  // };
  //
  // const handleReduceQuantity = () => {
  //   updateCartItem(dish, quantity - 1);
  //   setQuantity((prevState) => {
  //     if (prevState <= 1) {
  //       return prevState;
  //     }
  //     return prevState - 1;
  //   });
  // };

  const handleAddToCart = () => {
    if (isDishInCart) {
      return;
    }
    setIsDishInCart(true);
    addToCart(dish, 1);
  };

  return (
    <div
      className='fixed z-5 flex bg-orange-900 justify-between items-center inset-x-0 bottom-16  mx-14 px-3 py-2 rounded-md'>
      <div className='flex flex-row space-x-4'>
        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} alt={dish.name} width={40}
               height={40} className='rounded-sm' />
        <div className='flex flex-col text-md'>
          <p>{dish.name}</p>
          <p>{dish.dishWeight} gr</p>
        </div>
      </div>
      <div className='flex flex-row  justify-between'>
        {/*<div className='flex items-center space-x-4'>*/}
        {/*  <div className='flex justify-between space-x-1 items-center'>*/}
        {/*    <MinusIcon className='border-2 rounded-lg cursor-pointer border-gray-200 w-8 active:scale-95'*/}
        {/*               onClick={handleReduceQuantity} />*/}
        {/*    <span className='border-2 rounded-lg border-gray-200 px-5 py-1 text-xl'>{quantity}</span>*/}
        {/*    <PlusIcon className='border-2 rounded-lg cursor-pointer border-gray-200 w-8 active:scale-95'*/}
        {/*              onClick={handleAddQuantity} />*/}
        {/*  </div>*/}
        {/*  <p className='text-xl font-medium'>{dish.price * quantity} $</p>*/}
        {/*</div>*/}
        <div>
          {/*{width < 400 ?*/}
          {/*  <ShoppingCart color={dishInCart.length > 0 ? 'red' : ''} onClick={handleAddToCart} />*/}
          {/*  :*/}
          <Button disabled={isDishInCart} onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

