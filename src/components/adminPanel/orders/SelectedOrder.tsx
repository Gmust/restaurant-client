'use client';


import { useAdminOrdersStore } from '@/src/store/admin-orders-store';
import { cn } from '@/src/lib/utils';
import { OrderItem } from '@/src/components/order/OrderItem';
import { AdminOrderItem } from '@/src/components/adminPanel/orders/AdminOrderItem';
import { Statuses } from '@/@types/orders';
import { Button } from '@/src/components/shared/Button';
import { ChangeEvent, useState } from 'react';
import { OrdersService } from '@/src/service/ordersService';
import toast from 'react-hot-toast';
import { useUserStore } from '@/src/store/user-store';

export const SelectedOrder = () => {

  const { selectedOrder, actions: { updateOrderStatus, updateCurrentOrder } } = useAdminOrdersStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Statuses>();

  const handleChangeStatus = async () => {
    setIsLoading(true);
    try {
      if (selectedOrder?.email) {
        const response = await OrdersService.updateGuestOrderStatus({ orderId: selectedOrder._id, newStatus: status! });
        updateOrderStatus({ newStatus: response.newStatus, orderId: response.orderId });
        updateCurrentOrder(status!);
        toast.success(response.message);
      } else if (selectedOrder?.user) {
        console.log(user);
        console.log(status);
        const response = await OrdersService.updateOrderStatus({
          orderId: selectedOrder._id,
          newStatus: status!,
          userId: user?._id!,
        });
        updateOrderStatus({ newStatus: response.newStatus, orderId: response.orderId });
        updateCurrentOrder(status!);
        toast.success(response.message);
      }
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  };

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
        <select defaultValue={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.currentTarget.value as Statuses)}
                className='text-2xl block py-1 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
          {Object.values(Statuses).map(option =>
            <option selected={selectedOrder?.status == option ? true : false}>{option}</option>,
          )}
        </select>
        <Button disabled={selectedOrder?.status === status} isLoading={isLoading}
                onClick={handleChangeStatus}>
          Change status
        </Button>
      </div>
    </div>
  );
};

