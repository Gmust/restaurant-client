'use client';


import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Statuses } from '@/@types/orders';
import { AdminOrderItem } from '@/src/components/adminPanel/orders/AdminOrderItem';
import { CompleteOrderButton } from '@/src/components/adminPanel/orders/CompleteOrderButton';
import { OrderItem } from '@/src/components/order/OrderItem';
import { Button } from '@/src/components/shared/Button';
import { cn } from '@/src/lib/utils';
import { OrdersService } from '@/src/service/ordersService';
import { useAdminOrdersStore } from '@/src/store/admin-orders-store';
import { useUserStore } from '@/src/store/user-store';

export const SelectedOrder = () => {

  const { selectedOrder, actions: { updateOrderStatus, updateCurrentOrder } } = useAdminOrdersStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Statuses>(selectedOrder?.status!);


  useEffect(() => {
    setStatus(selectedOrder?.status!);
  }, [selectedOrder]);

  const handleChangeStatus = async () => {
    setIsLoading(true);
    try {
      if (selectedOrder?.email) {
        const response = await OrdersService.updateGuestOrderStatus({ orderId: selectedOrder._id, newStatus: status! });
        updateOrderStatus({ newStatus: response.newStatus, orderId: response.orderId });
        updateCurrentOrder(status!);
        toast.success(response.message);
      } else if (selectedOrder?.user) {
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
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col text-2xl text-black border-[3px] border-black rounded-md p-2'>
      {
        selectedOrder ?
          <>
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
              <select value={status}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.currentTarget.value as Statuses)}
                      className='text-2xl block py-1 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
                {Object.values(Statuses).map(option =>
                  <option selected={selectedOrder?.status == option} key={option} value={option}>{option}</option>,
                )}
              </select>
              <Button disabled={selectedOrder?.status === status} isLoading={isLoading}
                      onClick={handleChangeStatus}>
                Change status
              </Button>
              <CompleteOrderButton />
            </div>
          </>
          :
          <p>Select order form list to proceed work</p>
      }
    </div>
  );
};

