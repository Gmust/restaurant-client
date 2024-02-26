import Link from 'next/link';
import { OrderService } from '@/src/service/orderService';

type SuccessfulPaymentsSearchParams = {
  orderId: string,
}

type Props = {
  params: {},
  searchParams: SuccessfulPaymentsSearchParams,
}


const AbandonedPaymentPage = async ({ searchParams, params }: Props) => {

  const response = await OrderService.deleteOrder(searchParams.orderId);
  console.error(response);
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
