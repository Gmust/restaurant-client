'use client';


import { useAdminOrdersStore } from '@/src/store/admin-orders-store';
import { cn } from '@/src/lib/utils';
import { OrderItem } from '@/src/components/order/OrderItem';
import { AdminOrderItem } from '@/src/components/adminPanel/orders/AdminOrderItem';
import { Statuses } from '@/@types/orders';
import { Button } from '@/src/components/shared/Button';

export const SelectedOrder = () => {

  const { selectedOrder } = useAdminOrdersStore();
  console.log(selectedOrder);
  return (
    <div className='flex flex-col text-2xl text-black border-[3px] border-black rounded-md p-2'>
      <p>Order number: <strong>{selectedOrder?.orderNumber}</strong></p>
      {selectedOrder?.email ? <p>Email: <strong>{selectedOrder.email}</strong></p> : null}
      <p>Price: <strong>{selectedOrder?.totalPrice} $</strong></p>
      <p>
        Is takeaway:
        <strong className={cn('text-red-700', {
          'text-emerald-700': selectedOrder?.takeaway,
        })}>
          {selectedOrder?.takeaway ? ' Yes' : ' No'}
        </strong>
      </p>
      <div className='flex flex-col space-y-2 max-h-[350px] overflow-y-auto'>
        {selectedOrder?.orderItems.map(orderItem =>
          <AdminOrderItem quantity={orderItem.quantity} dish={orderItem.dish} key={orderItem._id} />,
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <p>Current status: <strong>{selectedOrder?.status}</strong></p>
        <select defaultValue={selectedOrder?.status} className='text-2xl block py-1 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
          {Object.values(Statuses).map(option =>
            <option>{option}</option>,
          )}
        </select>
        <Button>Change status</Button>
      </div>
    </div>
  );
};

