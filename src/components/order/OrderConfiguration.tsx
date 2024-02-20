import { Button } from '@/src/components/shared/Button';
import { OrderService } from '@/src/service/orderService';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { ICart } from '@/@types/cart';

export const OrderConfiguration = ({ cart }: { cart: ICart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handlePayForOrder = async () => {
    console.log('here');
    const response = await OrderService.payForOrder({ cartItems: cart.cartItems, totalPrice: cart.totalPrice });
    console.log('response', response);
    if (!response) {
      throw new Error('Something went wrong');
    }
    stripe?.redirectToCheckout({
      sessionId: response.sessionId,
    });
  };

  return (
    <div>
      <Button onClick={handlePayForOrder}>Test</Button>
    </div>
  );
};

