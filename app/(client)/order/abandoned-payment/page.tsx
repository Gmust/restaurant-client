import { Metadata } from 'next';
import Link from 'next/link';

import { OrdersService } from '@/src/service/ordersService';

type SuccessfulPaymentsSearchParams = {
  orderId: string,
}

type Props = {
  params: {},
  searchParams: SuccessfulPaymentsSearchParams,
}


export const metadata: Metadata = {
  title: 'Payment abandoned',
  description: 'Account confirmation page',
};

const AbandonedPaymentPage = async ({ searchParams, params }: Props) => {

  return (
    <div className='text-2xl  flex items-center justify-center h-4/6'>
      <p>
        Unfortunately payment was abandoned, <Link href='/order'><b className='font-semibold underline'>try to order
        again</b></Link> or <Link
        href='/contact'><b className='font-semibold underline'>contact us</b></Link>
      </p>
    </div>
  );
};

export default AbandonedPaymentPage;
