'use client';

import { useEffect, useState } from 'react';
import { PromoCodeCard } from '@/src/components/adminPanel/promo-codes/PromoCodeCard';
import { Button } from '@/src/components/shared/Button';
import { useAdminPromoCodesStore } from '@/src/store/admin-promo-codes-store';
import { CreatePromoCodeModal } from '@/src/components/adminPanel/promo-codes/CreatePromoCodeModal';

interface IPromoCodesListProps {
  promoCodes: IPromoCode[];
}

export const PromoCodesList = ({ promoCodes: initialPromoCodes }: IPromoCodesListProps) => {

  const { promoCodes, actions: { setPromoCodes } } = useAdminPromoCodesStore();
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    if (initialPromoCodes) {
      setPromoCodes(initialPromoCodes);
    }
  }, []);

  return (
    <>
      <div className='flex flex-col items-center justify-between h-full max-h-[500px]'>
        {promoCodes.length > 0 ?
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2'>
            {promoCodes.map(promoCode => <PromoCodeCard {...promoCode} key={promoCode._id} />)}
          </div>
          :
          <p className='mt-2 text-gray-600 opacity-80'>Promo codes list are empty...</p>
        }
        <Button className='w-1/2' onClick={() => setIsCreate(true)}>
          Create promo code
        </Button>
      </div>
      <CreatePromoCodeModal isActive={isCreate} setIsActive={setIsCreate} />
    </>
  );
};

