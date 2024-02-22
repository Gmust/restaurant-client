'use client';

import { OrderItems } from '@/src/components/order/OrderItems';
import { useCartStore } from '@/src/store/cart-store';
import { Button } from '@/src/components/shared/Button';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Modal } from '@/src/components/shared/Modal';
import { useState } from 'react';
import { OrderModalContent } from '@/src/components/order/OrderModalContent';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ProceedOrderPage = () => {

  const { cart } = useCartStore();
  const [openModel, setOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const handleProceedOrder = async () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
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

      </section>
      <Modal isActive={openModel} setIsActive={setOpenModal}>
        <Elements stripe={stripePromise}>
          <OrderModalContent setOpenModal={setOpenModal} />
        </Elements>
      </Modal>
    </>
  );
};

export default ProceedOrderPage;
