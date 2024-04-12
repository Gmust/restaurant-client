'use client'

import { IOrder } from '@/@types/orders';
import React, { useEffect } from 'react';
import { OrderInfo } from '@/src/components/order/OrderInfo';
import { AdminOrderCard } from '@/src/components/adminPanel/orders/AdminOrderCard';
import { useAdminOrdersStore } from '@/src/store/admin-orders-store';


interface IOrdersList {
  orders: IOrder[];
}

export const OrdersList = ({ orders: initialOrders }: IOrdersList) => {
  const { orders, actions: { setOrders, selectOrder } } = useAdminOrdersStore();

  useEffect(() => {
    setOrders(initialOrders);
    selectOrder(initialOrders[0]);
  }, []);

  return (
    <div className='flex flex-col space-y-4 overflow-y-auto'>
      {orders.length > 0 ? orders.map(order => <AdminOrderCard key={order._id} {...order} />) :
        <p>Orders queue is empty...</p>}
    </div>
  );
};

