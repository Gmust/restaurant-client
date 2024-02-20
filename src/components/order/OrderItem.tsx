import { ICartItem } from '@/@types/cart';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowBigLeft, ArrowBigRight, Trash } from 'lucide-react';
import { useCartStore } from '@/src/store/cart-store';

export const OrderItem = ({ _id, dish, quantity: initialQuantity }: ICartItem) => {

  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const removeFromCart = useCartStore(state => state.actions.removeFromCart);
  const updateCartItem = useCartStore(state => state.actions.updateCartItem);


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
    <div
      className='w-[380px] h-[110px] flex justify-between text-xl items-center bg-inherit  shadow-md border-2 border-[#591d25] p-1 space-x-2'>
      <div className='flex items-center space-x-1'>
        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} alt={dish.name} width={100}
               height={100} />
        <div className='flex flex-col'>
          <p className='font-semibold line-clamp-1'>{dish.name}</p>
          <p className='text-gray-400 opacity-80'>{dish.category}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <ArrowBigLeft className='cursor-pointer' width={30} height={30} onClick={handleReduceQuantity} />
        <p className='border border-white px-2 py-1'>{quantity}</p>
        <ArrowBigRight className='cursor-pointer' width={30} height={30} onClick={handleAddQuantity} />
      </div>
      <div className='flex flex-col items-center'>
        <p>{dish.price * quantity}$</p>
        <Trash className='cursor-pointer' color='red' width={25} height={25} onClick={() => removeFromCart(dish)} />
      </div>
    </div>
  );
};

