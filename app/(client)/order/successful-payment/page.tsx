'use client';

import { OrderService } from '@/src/service/orderService';
import Link from 'next/link';
import { useCartStore } from '@/src/store/cart-store';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/src/components/shared/Button';

type SuccessfulPaymentsSearchParams = {
  email: string,
  confirmationToken: string,
  orderNum: string
}

type Props = {
  params: {},
  searchParams: SuccessfulPaymentsSearchParams,
}

const SuccessfulPaymentPage = (props: Props) => {

  const searchParams = props.searchParams;
  const [response, setResponse] = useState<string | null>('dsdsdsdsdsds');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { actions: { clearCart } } = useCartStore();
  useEffect(() => {
    const confirmOrder = async () => {
      setIsLoading(true);
      try {
        const confirmOrder = await OrderService.confirmOrder({
          orderNumber: searchParams.orderNum,
          email: searchParams.email,
          confirmationToken: searchParams.confirmationToken,
        });
        if (confirmOrder) {
          setResponse(confirmOrder.message);
          clearCart();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    confirmOrder();
  }, []);

  return (

    <div className='text-xl font-semibold  flex items-center justify-center h-4/6'>
      {
        isLoading ? <Loader2 className='animate-spin' size={62} /> :
          response ?
            <div className='flex flex-col space-y-2 justify-center items-center'>
              <p>
                {response}
              </p>
              <Link href={`/order/order-status?orderNum=${searchParams.orderNum}&email=${searchParams.email}`}>
                <Button>
                  Check order status
                </Button>
              </Link>
            </div>
            :
            <p className='mx-10'>
              Something went wrong, please contact us to solve this problem, provide us your order
              number: <b className='underline'>{searchParams.orderNum}</b> and email <b
              className='underline'>{searchParams.email}</b> please
            </p>
      }
    </div>
  );
};

export default SuccessfulPaymentPage;
