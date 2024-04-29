import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { OrdersList } from '@/src/components/adminPanel/orders/OrdersList';
import { SelectedOrder } from '@/src/components/adminPanel/orders/SelectedOrder';
import { OrdersService } from '@/src/service/ordersService';

export const metadata: Metadata = {
  title: 'Orders page',
  description: 'Orders page',
};


const OrdersPage = async () => {

  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }
  const orders = await OrdersService.getAllOrders(token);

  return (
    <section className='flex items-start p-4 justify-between'>
      <OrdersList orders={orders} />
      <SelectedOrder />
    </section>
  );
};

export default OrdersPage;
