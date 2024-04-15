import { Dispatch, SetStateAction, useState } from 'react';
import { useAdminPromoCodesStore } from '@/src/store/admin-promo-codes-store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createPromoCodeValidator } from '@/src/lib/validations/create-promo-code';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/src/components/shared/Modal';
import { CustomInput } from '@/src/components/shared/CustomInput';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { fromISOSToReadable } from '@/src/utils/fromISOSToReadable';
import { Button } from '@/src/components/shared/Button';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { Tooltip } from '@/src/components/shared/Tooltip';

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

  const onSubmit = async ({}: formData) => {
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

    } catch (e) {

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
            <Tooltip tooltipText='Generate random string' position='top' >
              <GiPerspectiveDiceSixFacesRandom size={50} className='cursor-pointer hover:animate-spin' />
            </Tooltip>
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
          <DatePicker selected={expirationDate} onChange={(date) => setExpirationDate(date)} showTimeSelect inline />
          {
            expirationDate &&
            <p>Picked date: {expirationDate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</p>
          }
          <p className='text-red-700 text-sm'>{errors.expiresIn && errors.expiresIn.message}</p>
        </div>
        <Button disabled={!isValid || isLoading || !expirationDate} isLoading={isLoading}>Create</Button>
      </form>
    </Modal>
  );
};

