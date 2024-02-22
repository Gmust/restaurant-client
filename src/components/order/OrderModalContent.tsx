import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderValidator } from '@/src/lib/validations/create-order';
import { z } from 'zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CreditCard, ShoppingBag } from 'lucide-react';
import { MdTableBar } from 'react-icons/md';
import { cn } from '@/src/lib/utils';
import { Tooltip } from '@/src/components/shared/Tooltip';
import { Button } from '@/src/components/shared/Button';
import { useCartStore } from '@/src/store/cart-store';
import { OrderService } from '@/src/service/orderService';
import { useStripe } from '@stripe/react-stripe-js';

type formData = z.infer<typeof createOrderValidator>

interface IOrderModalContentProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}


export const OrderModalContent = ({ setOpenModal }: IOrderModalContentProps) => {
  const [isTakeaway, setIsTakeaway] = useState<boolean | null>(null);
  const [takeAwayError, setTakeawayError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { cart, actions: { clearCart } } = useCartStore();
  const stripe = useStripe();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    mode: 'onSubmit',
    resolver: zodResolver(createOrderValidator),
  });

  useEffect(() => {
    if (isTakeaway !== null) {
      setTakeawayError('');
    }
  }, [isTakeaway]);

  const onSubmit = async ({ email, promoCode }: formData) => {
    setIsLoading(true);
    try {
      if (!email) return setError('email', { type: 'required', message: 'Provide email' });
      if (isTakeaway === null) {
        setTakeawayError('Please select takeaway option');
        return;
      }
      const response = await OrderService.payForGuestOrder({
        email,
        promoCode: promoCode ? promoCode : undefined,
        takeaway: isTakeaway,
        orderDate: new Date().toISOString(),
        cartItems: cart.cartItems,
        totalPrice: cart.totalPrice,
      });
      if (!response) {
        console.error('Something went wrong');
      } else {
        await stripe?.redirectToCheckout({
          sessionId: response.sessionId,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className='flex flex-col space-y-4 '>
      <h2 className='text-4xl font-bold'>Please complete order information:</h2>
      <div className='flex flex-col  items-center space-y-1 '>
        <label className='text-xl font-semibold'>Would you like eat at place or takeaway?</label>
        {
          isTakeaway === true &&
          <p className='text-lg animate-fadeInRight'>Current pick is <b>TAKEAWAY</b></p>
        }
        {
          isTakeaway === false &&
          <p className='text-lg animate-fadeInLeft'>Current pick is <b>EAT AT PLACE </b></p>
        }
        <div className='flex items-center space-x-8'>
          <Tooltip tooltipText='Takeaway' position='bottom'>
            <div
              className={cn('border-2 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-emerald-500 transition duration-500 hover:border-emerald-500', {
                'bg-emerald-500  border-emerald-500': isTakeaway === true,
                'bg-red-500  border-red-500': isTakeaway === false,
              })} onClick={() => setIsTakeaway(true)}>
              <ShoppingBag size={50} color={isTakeaway === true ? 'green' : 'black'}
              />
            </div>
          </Tooltip>
          <Tooltip tooltipText='At place' position='bottom'>
            <div
              className={cn('border-2 border-gray-400 rounded-md p-4 cursor-pointer  hover:bg-emerald-500 transition duration-500 hover:border-emerald-500', {
                'bg-emerald-500  border-emerald-500': isTakeaway === false,
                'bg-red-500  border-red-500': isTakeaway === true,
              })} onClick={() => setIsTakeaway(false)}>
              <MdTableBar size={50} color={isTakeaway === true ? 'black' : 'green'}
              />
            </div>
          </Tooltip>
        </div>
        <p className='text-red-700 font-semibold text-lg animate-fadeInBottom'>{takeAwayError}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-start mx-10 space-y-4'>
        <div className='flex flex-col labelStar '>
          <label htmlFor='email'>Email:</label>
          <input id='email' required {...register('email', { required: true })} type='email' autoComplete='on'
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2 ' />
          <p className='text-red-700 font-semibold text-lg animate-fadeInBottom'>
            {errors.email?.message}
          </p>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='promoCode' className='text-gray-700'>
            Promo code:
          </label>
          <input
            id='promoCode' {...register('promoCode')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:border-amber-700 focus:ring-blue-500 block w-full p-2'
          />
          <p className='text-gray-400 text-xs'>*Enter promo code to receive a discount </p>
          <p className='text-red-700 font-semibold text-lg animate-fadeInBottom'>
            {errors.promoCode?.message}
          </p>
        </div>

        <div className='flex w-full justify-around'>
          <Button className='bg-red-500  hover:bg-red-700' onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button className='bg-emerald-500 flex items-center space-x-1 hover:bg-emerald-700' type='submit'
                  isLoading={isLoading}>
            <p> Pay </p>
            <CreditCard />
          </Button>
        </div>
      </form>
    </div>
  );
};
