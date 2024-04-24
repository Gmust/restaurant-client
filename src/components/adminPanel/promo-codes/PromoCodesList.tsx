'use client';

import { useEffect, useState } from 'react';

import { CreatePromoCodeModal } from '@/src/components/adminPanel/promo-codes/CreatePromoCodeModal';
import { DeletePromoCode } from '@/src/components/adminPanel/promo-codes/DeletePromoCode';
import { PromoCodeCard } from '@/src/components/adminPanel/promo-codes/PromoCodeCard';
import { Button } from '@/src/components/shared/Button';
import { useAdminPromoCodesStore } from '@/src/store/admin-promo-codes-store';

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
      <div className='flex items-start justify-between h-full'>
        {promoCodes.length > 0 ?
          <div className='grid grid-cols-1 gap-y-1 mt-2 max-h-[500px] overflow-y-auto'>
            {promoCodes.map(promoCode => <PromoCodeCard {...promoCode} key={promoCode._id} />)}
          </div>
          :
          <p className='mt-2 text-gray-600 opacity-80'>Promo codes list are empty...</p>
        }
        <Button className='mt-4' onClick={() => setIsCreate(true)}>
          Create promo code
        </Button>
      </div>
      <CreatePromoCodeModal isActive={isCreate} setIsActive={setIsCreate} />
    </>
  );
};

