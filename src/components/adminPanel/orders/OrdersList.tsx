'use client'

import React, { useEffect } from 'react';

import { IOrder } from '@/@types/orders';
import { AdminOrderCard } from '@/src/components/adminPanel/orders/AdminOrderCard';
import { OrderInfo } from '@/src/components/order/OrderInfo';
import { useAdminOrdersStore } from '@/src/store/admin-orders-store';


interface IOrdersList {
  orders: IOrder[];
}

export const OrdersList = ({ orders: initialOrders }: IOrdersList) => {
  const { orders, actions: { setOrders, selectOrder } } = useAdminOrdersStore();

  useEffect(() => {
    if(initialOrders){
      setOrders(initialOrders);
      selectOrder(initialOrders[0]);
    }
  }, []);

  return (
    <div className='flex flex-col space-y-4 overflow-y-auto'>
      {orders.length > 0 ? orders.map(order => <AdminOrderCard key={order._id} {...order} />) :
        <p className='text-gray-600 opacity-80'>Orders queue is empty...</p>}
    </div>
  );
};

