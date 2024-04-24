import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/src/components/shared/Button';
import { Modal } from '@/src/components/shared/Modal';
import { PromoCodesService } from '@/src/service/promoCodesService';
import { useAdminPromoCodesStore } from '@/src/store/admin-promo-codes-store';

interface IDeletePromoCodeProps {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>
  promoCodeId: string
}

export const DeletePromoCode = ({ promoCodeId, isActive, setIsActive }: IDeletePromoCodeProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { actions: { deletePromoCode } } = useAdminPromoCodesStore();

  const handleDeletePromoCode = async () => {
    setIsLoading(true);
    try {
      const response = await PromoCodesService.deletePromoCode(promoCodeId);
      toast.success(response.message);
      deletePromoCode(promoCodeId);
      setIsActive(false);
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
      <div className='flex flex-col items-center space-y-6'>
        <p>Are you sure you want to remove this promo code?</p>
        <div className='flex justify-around w-full'>
          <Button className='bg-emerald-700 hover:bg-emerald-600' onClick={handleDeletePromoCode} isLoading={isLoading}
                  disabled={isLoading}>
            Yes
          </Button>
          <Button className='bg-red-600 hover:bg-red-500' onClick={() => setIsActive(false)} disabled={isLoading}
                  isLoading={isLoading}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

