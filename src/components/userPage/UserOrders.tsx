import { IUser } from '@/@types/user';
import { OrderItem } from '@/src/components/order/OrderItem';

type IUserOrdersProps = Pick<IUser, 'orders'>

export const UserOrders = ({ orders }: IUserOrdersProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {orders.map(order =>
        <div className='flex justify-between'>
          <div className='flex flex-col items-start justify-between'>
            <p>Order No̱: ${order.orderNumber}</p>
            <p>Order status: ${order.status}</p>
          </div>
          <div className='overflow-auto max-w-[390px]'>
            {order.orderItems.map(orderItem =>
              <div
                className='flex justify-between text-xl items-center bg-inherit  shadow-md border-2 border-[#591d25] p-1 space-x-2'>
                <div className='flex items-center space-x-1'>
                  <div className='flex flex-col'>
                    <p className='font-semibold line-clamp-1 '>{orderItem.dish.name}</p>
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
        </div>,
      )}
    </div>
  );
};

