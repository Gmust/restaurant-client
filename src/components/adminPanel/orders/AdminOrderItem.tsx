import Image from 'next/image';

import { IDish } from '@/@types/dishes';

interface IAdminOrderItem {
  quantity: number,
  dish: IDish
}

export const AdminOrderItem = ({ quantity, dish }: IAdminOrderItem) => {
  return (
    <div className='flex items-center border-2 border-black rounded-md p-1'>
      <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} width={100} height={50}
             alt={dish.name} />
      <div className='flex flex-col justify-between'>
        <p>Name: <strong>{dish.name}</strong></p>
        <p>Quantity: <strong>{quantity}</strong></p>
      </div>
    </div>
  );
};

