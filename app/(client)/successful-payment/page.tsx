import { OrderService } from '@/src/service/orderService';

type SuccessfulPaymentsSearchParams = {
  email: string,
  confirmationToken: string,
  orderNum: string
}

type Props = {
  params: {},
  searchParams: SuccessfulPaymentsSearchParams,
}

const SuccessfulPaymentPage = async (props: Props) => {

  const searchParams = props.searchParams;
  const confirmOrder = await OrderService.confirmOrder({
    orderNumber: searchParams.orderNum,
    email: searchParams.email,
    confirmationToken: searchParams.confirmationToken,
  });



  return (
    <div>
      Thank you for you order
    </div>
  );
};

export default SuccessfulPaymentPage;
