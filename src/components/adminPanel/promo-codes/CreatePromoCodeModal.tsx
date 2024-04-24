import 'react-datepicker/dist/react-datepicker.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { z } from 'zod';

import { Button } from '@/src/components/shared/Button';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { Modal } from '@/src/components/shared/Modal';
import { createPromoCodeValidator } from '@/src/lib/validations/create-promo-code';
import { PromoCodesService } from '@/src/service/promoCodesService';
import { useAdminPromoCodesStore } from '@/src/store/admin-promo-codes-store';
import { generateString } from '@/src/utils/generateString';

interface ICreatePromoCodeModalProps {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>
}

type formData = z.infer<typeof createPromoCodeValidator>

export const CreatePromoCodeModal = ({ isActive, setIsActive }: ICreatePromoCodeModalProps) => {

  const { actions: { createPromoCode } } = useAdminPromoCodesStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const { register, reset, setError, handleSubmit, setValue, formState: { errors, isValid } } = useForm<formData>({
    mode: 'all',
    resolver: zodResolver(createPromoCodeValidator),
  });

  const onSubmit = async (formData: formData) => {
    if (!expirationDate) {
      setError('expiresIn', {
        type: 'required',
        message: 'End date is required',
      });
    }
    if (expirationDate! < new Date()) {
      setError('expiresIn', {
        type: 'value',
        message: 'You can`t set expiration date in the past!',
      });
    }
    setIsLoading(true);
    try {
      const response = await PromoCodesService.createPromoCode({
        promoCode: formData.promoCode,
        expiresIn: formData.expiresIn!,
        discountValue: formData.discountValue,
      });
      toast.success(response.message);
      createPromoCode(response.newPromoCode);
      reset();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
        <h2 className='text-2xl font-semibold'>Create new promo code:</h2>
        <div className='flex flex-col'>
          <label htmlFor='promoCode'>Promo code:</label>
          <span className='flex items-center space-x-2'>
            <CustomInput id='promoCode' {...register('promoCode')} variant='rounded' />
            <GiPerspectiveDiceSixFacesRandom className='w-14 h-14 cursor-pointer hover:animate-spin'
                                             onClick={() => {
                                               setValue('promoCode', generateString().slice(0, 20));
                                             }} />
          </span>
          <p className='text-red-700 text-sm'>{errors.promoCode && errors.promoCode.message}</p>
        </div>
        <div className='flex flex-col'>
          <label>Discount value (in %):</label>
          <CustomInput {...register('discountValue', { valueAsNumber: true })} type='number' max={100} min={1}
                       variant='rounded' />
          <p className='text-red-700 text-sm'>{errors.discountValue && errors.discountValue.message}</p>
        </div>
        <div className='flex flex-col'>
          <label>Expiration date:</label>
          <DatePicker {...register('expiresIn')} selected={expirationDate} onChange={(date) => {
            setValue('expiresIn', date?.toISOString());
            setExpirationDate(date);
          }} showTimeSelect inline />
          {
            expirationDate &&
            <p>Picked date: {expirationDate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</p>
          }
          <p className='text-red-700 text-sm'>{errors.expiresIn && errors.expiresIn.message}</p>
        </div>
        <Button type='submit' disabled={!isValid || isLoading || !expirationDate} isLoading={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

