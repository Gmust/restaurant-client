import { IOrder, IUserOrder } from '@/@types/orders';
import Link from 'next/link';

type IUserOrdersProps = {
  orders: IUserOrder[]
}

export const UserOrders = ({ orders }: IUserOrdersProps) => {
  return (
    <div className='grid grid-cols-1 gap-y-1'>
      {orders.map(order =>
        <Link href={`/order/full-info/${order._id}`}
              className='flex justify-between items-center  shadow-2xl p-2 cursor-pointer hover:scale-105 transition duration-200 space-x-5 '
              key={order._id}>
          <div className='flex flex-col items-start justify-center'>
            <p>Order No̱: {order.orderNumber}</p>
            <p>Total price: {order.totalPrice}</p>
            <p>Order status: {order.status}</p>
          </div>
          <div className='overflow-auto max-h-[140px] w-[290px] scroll-smooth'>
            {order.orderItems.map(orderItem =>
              <div key={orderItem._id}
                   className='flex justify-between text-xl items-center bg-inherit  shadow-md border-2 border-[#591d25] p-1 space-x-2'>
                <div className='flex items-center space-x-1'>
                  <div className='flex flex-col'>
                    <p className='font-semibold line-clamp-1'>{orderItem.dish.name}</p>
                    <p className='text-gray-400 opacity-80'>{orderItem.dish.category}</p>
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <p>Price: <b>{orderItem.dish.price * orderItem.quantity}$</b></p>
                  <p>Quantity: <b>{orderItem.quantity}</b></p>
                </div>
              </div>,
            )}
          </div>
        </Link>,
      )}
    </div>
  );
};

