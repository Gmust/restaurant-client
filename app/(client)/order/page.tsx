'use client';

import { OrderItems } from '@/src/components/order/OrderItems';
import { useCartStore } from '@/src/store/cart-store';
import { Button } from '@/src/components/shared/Button';
import { useRouter } from 'next/navigation';
import { OrderService } from '@/src/service/orderService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { OrderConfiguration } from '@/src/components/order/OrderConfiguration';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const OrderPage = () => {

  const { cart } = useCartStore();

  const router = useRouter();

  const handleProceedOrder = async () => {

  };


  return (
    <section className='flex flex-col'>
      <div className='flex justify-around text-xl font-semibold'>
        <h2>Your order:</h2>
        <p className='decoration-amber-500 decoration-2 underline'>Total price: {cart.totalPrice}$</p>
      </div>
      <OrderItems />
      <div className='flex justify-around items-center mt-10 animate-fadeInBottom'>
        <Button onClick={() => router.push('/menu')}>Go back</Button>
        <Button onClick={handleProceedOrder}>Proceed order</Button>
      </div>
      <Elements stripe={stripePromise}>
        <OrderConfiguration cart={cart}/>
      </Elements>
    </section>
  );
};

export default OrderPage;
