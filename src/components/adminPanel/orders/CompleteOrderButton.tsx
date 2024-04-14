import { useAdminOrdersStore } from '@/src/store/admin-orders-store';
import { useState } from 'react';
import { Button } from '@/src/components/shared/Button';
import { Statuses } from '@/@types/orders';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { OrdersService } from '@/src/service/ordersService';

export const CompleteOrderButton = () => {

  const { selectedOrder, actions: { completeOrder, selectOrder } } = useAdminOrdersStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCompleteOrder = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersService.completeOrder(selectedOrder?._id!);
      toast.success(response.message);
      completeOrder(selectedOrder?._id!);
      selectOrder(null);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className='bg-emerald-700 hover:bg-emerald-600'
            disabled={selectedOrder?.status !== Statuses.completed || isLoading}
            isLoading={isLoading}
            onClick={handleCompleteOrder}
    >
      Complete order
    </Button>
  );
};

