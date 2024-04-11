import { IOrder } from '@/@types/orders';
import { useAdminOrdersStore } from '@/src/store/admin-orders-store';

export const AdminOrderCard = (order: IOrder) => {

  const { actions: { selectOrder } } = useAdminOrdersStore();

  return (
    <div
      className='flex flex-col text-xl text-black border-[3px] border-black rounded-md p-2 cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300'>
      <div className='flex justify-between' onClick={() => selectOrder(order)}>
        <div>
          <p>Order number: <strong>{order.orderNumber}</strong></p>
          <p>Price: <strong>{order.totalPrice} $</strong></p>
        </div>
        <div>
          <p>Order status:<strong>{order.status}</strong></p>
          <p>Takeaway: <strong>{order.takeaway}</strong></p>
        </div>
      </div>
      <div className='flex justify-between space-x-3 mt-2'>
        <p>Created at: <strong>{new Date(order.created_at).toLocaleString([], {
          dateStyle: 'short',
          timeStyle: 'short',
        })}</strong></p>
        <p>Updated at: <strong>{new Date(order.created_at).toLocaleString([], {
          dateStyle: 'short',
          timeStyle: 'short',
        })}</strong></p>
      </div>
    </div>
  );
};

