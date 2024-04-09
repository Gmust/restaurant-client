import { IOrder } from '@/@types/orders';

export const AdminOrderCard = (order: IOrder) => {
  return (
    <div className='flex flex-col text-xl text-black border-[3px] border-black rounded-md p-2 cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300'>
      <div className='flex justify-between'>
        <div>
          <p>Order number: <b>{order.orderNumber}</b></p>
          <p>Price: <b>{order.totalPrice} $</b></p>
        </div>
        <div>
          <p>Order status:<b>{order.status}</b></p>
          <p>Takeaway: <b>{order.takeaway}</b></p>
        </div>
      </div>
      <div className='flex justify-between space-x-3 mt-2'>
        <p>Created at: <b>{new Date(order.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</b></p>
        <p>Updated at: <b>{new Date(order.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</b></p>
      </div>
    </div>
  );
};

