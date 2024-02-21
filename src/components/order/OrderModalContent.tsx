import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderValidator } from '@/src/lib/validations/create-order';
import { z } from 'zod';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { MdTableBar } from 'react-icons/md';
import { cn } from '@/src/lib/utils';
import { Tooltip } from '@/src/components/shared/Tooltip';

type formData = z.infer<typeof createOrderValidator>

export const OrderModalContent = () => {
  const [isTakeaway, setIsTakeaway] = useState<boolean | null>();
  const [isHover, setIsHover] = useState<boolean | null>();


  const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    mode: 'onSubmit',
    resolver: zodResolver(createOrderValidator),
  });

  const onSubmit = async () => {
    if (isTakeaway === null) {
      return;
    }
  };

  return (
    <div className='flex flex-col space-y-4'>
      <h2 className='text-4xl font-bold'>Please complete order information:</h2>
      <div className='flex flex-col  items-center space-y-1 '>
        <label className='text-xl font-semibold'>Would you like eat at place or takeaway?</label>
        {
          isTakeaway === true &&
          <p className='text-lg'>Current pick is <b>TAKEAWAY</b></p>
        }
        {
          isTakeaway === false &&
          <p className='text-lg'>Current pick is <b>EAT AT PLACE </b></p>
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
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-start mx-10 space-y-4'>
        <div className='flex flex-col labelStar '>
          <label htmlFor='email'>Email:</label>
          <input id='email'  required className='border-2 border-amber-500 rounded-md  px-2 py-0.5 active:border-amber-700'/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='promoCode'>Promo code:</label>
          <input id='promoCode' className='border-2 border-amber-500 rounded-md px-2 py-0.5 focus:border-amber-700'/>
        </div>
      </form>
    </div>
  );
};

