import { IOrder } from '@/@types/orders';
import { useAdminOrdersStore } from '@/src/store/admin-orders-store';
import { cn } from '@/src/lib/utils';

export const AdminOrderCard = (order: IOrder) => {

  const { actions: { selectOrder } } = useAdminOrdersStore();

  return (
    <div onClick={() => selectOrder(order)}
      className='flex flex-col text-xl text-black border-[3px] border-black rounded-md p-2 cursor-pointer hover:scale-95 hover:shadow-2xl transition duration-300'>
      <div className='flex justify-between' >
        <div>
          <p>Order number: <strong>{order.orderNumber}</strong></p>
          <p>Price: <strong>{order.totalPrice} $</strong></p>
        </div>
        <div>
          <p>Order status:<strong>{order.status}</strong></p>
          <p>Takeaway: <strong className={cn('text-red-700', {
            'text-emerald-700': order.takeaway,
          })}>
            {order.takeaway ? ' Yes' : ' No'}
          </strong></p>
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

