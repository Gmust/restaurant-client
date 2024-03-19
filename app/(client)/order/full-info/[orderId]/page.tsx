'use client';


import { notFound, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/src/store/user-store';
import { AuthService } from '@/src/service/authService';
import { socket } from '@/src/utils/socket';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { OrdersService } from '@/src/service/ordersService';
import { IOrder } from '@/@types/orders';
import { OrderInfo } from '@/src/components/order/OrderInfo';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/src/components/shared/Button';

const FullInfoOrderPage = () => {

  const pathname = usePathname();
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const { user, isAuth, actions } = useUserStore();
  const router = useRouter();

  const handelStatusUpdate = (newStatus: string) => {
    // @ts-ignore
    setCurrentOrder(prevState => {
      return { ...prevState, status: newStatus };
    });
  };

  useEffect(() => {
    console.log('Attempting to connect to WebSocket...');
    console.log(pathname.split('/').slice(-1)[0]);
    const getOrderInfo = async () => {
      try {
        const order = await OrdersService.getOrderById(pathname.split('/').slice(-1)[0]);
        console.log(order);
        if (order) setCurrentOrder(order);
      } catch (e) {
        toast.error('Something went wrong, try again later!');
        router.push(`/user/account-info`);
      }
    };

    getOrderInfo();

    if (!user) {
      toast.error('Something went wrong, try again later!');
      router.push(`/user/account-info`);
    }

    const socket = io(process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL!, {
      withCredentials: true,
      extraHeaders: {
        'id': user?._id!,
      },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected successfully!');
    });

    socket.on('update-order-status', (data: any) => {
      console.log('Received update-order-status event:', data.newStatus);
      handelStatusUpdate(data.newStatus);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected.');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    return () => {
      console.log('Disconnecting WebSocket...');
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className='flex flex-col space-y-6 justify-center items-center h-3/5'>
      {
        currentOrder ?
          <OrderInfo  {...currentOrder} />
          : <Loader2 className='animate-spin' />
      }
      <div>
        <Button size='lg' className='text-2xl space-x-2'>
          <ArrowLeft />
          <p>Return</p>
        </Button>
      </div>
    </div>
  );
};

export default FullInfoOrderPage;
