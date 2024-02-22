import { fromISOSToReadable } from '@/src/utils/fromISOSToReadable';
import { IOrder } from '@/@types/orders';

export const OrderInfo = (orderInfo: IOrder) => {
  return (
    <div
      className='bg-white p-4 border rounded-md border-black text-black flex flex-col items-center space-y-2'>
      <h2 className='text-2xl'>Order number {orderInfo.orderNumber}</h2>
      <h3 className='text-xl'>Current status: <b>{orderInfo.status}</b></h3>
      <div className='grid grid-cols-2 gap-x-4'>
        <div className='flex-col  snap-y snap-mandatory'>
          <p className='text-xl'>Order items:</p>
          <div className='overflow-auto max-h-96 border-2 border-black '>
            {orderInfo.orderItems.map(orderItem =>
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
        </div>
        <div className='flex flex-col mt-6  justify-start text-lg'>
          <p>Email: <b>{orderInfo.email}</b></p>
          <p>Total Price: <b>{orderInfo.totalPrice}$</b></p>
          <p>Ordered at: <b>{fromISOSToReadable(orderInfo.created_at)}</b></p>
          <p>Takeaway: <b>{orderInfo.takeaway ? 'Yes' : 'No'}</b></p>
        </div>
      </div>
    </div>
  );
};

