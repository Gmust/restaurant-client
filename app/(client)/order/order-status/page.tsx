'use client';

import { OrdersService } from '@/src/service/ordersService';
import { Button } from '@/src/components/shared/Button';
import { useEffect, useState } from 'react';
import { IOrder } from '@/@types/orders';
import { useSearchParams } from 'next/navigation';
import { OrderInfo } from '@/src/components/order/OrderInfo';
import { OrderInfoSkeleton } from '@/src/components/loaders/OrderInfoSkeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getOrderInfoValidator } from '@/src/lib/validations/get-order-info';
import { z } from 'zod';
import { createOrderValidator } from '@/src/lib/validations/create-order';

type CheckOrderSearchParams = {
  email: string,
  orderNum: string
}

type formData = z.infer<typeof createOrderValidator>


const OrderStatusPage = () => {

  const [orderInfo, setOrderInfo] = useState<IOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    mode: 'onSubmit',
    resolver: zodResolver(getOrderInfoValidator),
  });
  const searchParams = useSearchParams();

  const onSubmit = async () => {

  };

  useEffect(() => {
    const fetchOrderInfo = async ({ orderNum, email }: CheckOrderSearchParams) => {
      setIsLoading(true);
      try {
        const orderResponse = await OrdersService.fetchOrderInfo({
          orderNumber: orderNum,
          email,
        });
        if (!orderResponse || orderResponse.statusCode === 400) {
          setErrorMessage(
            'There was a problem with receiving information about this order with provided information.' +
            ' Check your email and order number',
          );
        } else {
          setOrderInfo(orderResponse);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchParams.get('orderNum') && searchParams.get('email')) {
      fetchOrderInfo({ orderNum: searchParams.get('orderNum')!, email: searchParams.get('email')! });
    }
  }, [searchParams]);

  return (
    <div className='flex items-center justify-center '>
      <div className='flex flex-col items-center'>
        <form className='flex flex-col space-y-1' onSubmit={handleSubmit(onSubmit)}>
          <input name='email' />
          <input name='orderNumber' />
          <Button type='submit'>Find</Button>
        </form>
        {
          isLoading ? <OrderInfoSkeleton />
            : orderInfo ?
              <OrderInfo {...orderInfo} />
              :
              <p>
                {errorMessage ? errorMessage :
                  'Error with getting order info, please, try again later!'
                }
              </p>
        }
      </div>
    </div>
  );
};


export default OrderStatusPage;
