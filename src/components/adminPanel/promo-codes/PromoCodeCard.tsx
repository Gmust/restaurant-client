import { fromISOSToReadable } from '@/src/utils/fromISOSToReadable';
import { Button } from '@/src/components/shared/Button';
import { MdDelete } from 'react-icons/md';
import { transformToShortDate } from '@/src/utils/transformToShortDate';
import { DeletePromoCode } from '@/src/components/adminPanel/promo-codes/DeletePromoCode';
import { useState } from 'react';

export const PromoCodeCard = ({ promoCode, created_at, discountValue, expiresIn, updated_at, _id }: IPromoCode) => {

  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-col p-2 border-2 border-black rounded-md'>
        <p>Promo code: <strong>{promoCode}</strong></p>
        <div className='flex justify-between space-x-8'>
          <div>
            <p>Discount value: <strong>{discountValue} %</strong></p>
            <p>Expires in: <strong>{transformToShortDate(expiresIn)}</strong></p>
          </div>
          <div>
            <p>Created at: <strong>{transformToShortDate(created_at)}</strong></p>
            <p>Updated at: <strong>{transformToShortDate(updated_at)}</strong></p>
          </div>
        </div>
        <Button className='h-full bg-red-700 hover:bg-red-600 mt-2' onClick={() => setIsDelete(true)}>
          <MdDelete />
        </Button>
      </div>
      <DeletePromoCode isActive={isDelete} setIsActive={setIsDelete} promoCodeId={_id} />
    </>
  );
};

