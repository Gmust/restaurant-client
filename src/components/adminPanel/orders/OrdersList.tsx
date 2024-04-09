import { IOrder } from '@/@types/orders';
import React from 'react';
import { OrderInfo } from '@/src/components/order/OrderInfo';
import { AdminOrderCard } from '@/src/components/adminPanel/orders/AdminOrderCard';


interface IOrdersList {
  orders: IOrder[];
}

export const OrdersList = ({ orders }: IOrdersList) => {
  return (
    <div className='grid grid-cols-1 gap-y-4'>
      {orders.length > 0 ? orders.map(order => <AdminOrderCard key={order._id} {...order} />) :
        <p>Orders queue is empty...</p>}
    </div>
  );
};

