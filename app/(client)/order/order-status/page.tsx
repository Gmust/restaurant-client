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
import { CustomInput } from '@/src/components/shared/CustomInput';
import { findOrderValidator } from '@/src/lib/validations/find-order';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type CheckOrderSearchParams = {
  email: string,
  orderNum: string
}

type formData = z.infer<typeof findOrderValidator>


const OrderStatusPage = () => {

  const [orderInfo, setOrderInfo] = useState<IOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<formData>({
    mode: 'all',
    resolver: zodResolver(findOrderValidator),
    defaultValues: {
      email: searchParams.get('email') || undefined,
      orderNum: searchParams.get('orderNum') || undefined,
    },
  });

  const onSubmit = async (formData: formData) => {
    setIsLoading(true);
    try {
      const response = await OrdersService.fetchOrderInfo({
        email: formData.email,
        orderNumber: formData.orderNum
      });

      setOrderInfo(response!)
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
    <div className='flex items-center justify-center mt-10'>
      <div className='flex flex-col items-center'>
        <form className='flex flex-col space-y-1 mb-2 md:w-1/2' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col '>
            <label htmlFor='email' className='text-2xl w-full'>Email:</label>
            <CustomInput id='email' {...register('email')} variant='rounded' />
            <p className='text-md text-red-700'>{errors.email && errors.email.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='orderNum' className='text-2xl w-full'>Order number:</label>
            <CustomInput id='orderNum'  {...register('orderNum')} variant='rounded' />
            <p className='text-md text-red-700'>{errors.orderNum && errors.orderNum.message}</p>
          </div>
          <Button type='submit' disabled={!isValid || isLoading}>Find</Button>
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
