import { OrdersService } from '@/src/service/ordersService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { OrdersList } from '@/src/components/adminPanel/orders/OrdersList';

const OrdersPage = async () => {

  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }
  const orders = await OrdersService.getAllOrders(token);

  return (
    <section className='flex p-4'>
      <OrdersList orders={orders}/>
    </section>
  );
};

export default OrdersPage;
