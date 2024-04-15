import { fromISOSToReadable } from '@/src/utils/fromISOSToReadable';

export const PromoCodeCard = ({ promoCode, created_at, discountValue, expiresIn, updated_at, _id }: IPromoCode) => {
  return (
    <div className='flex'>
      <div className='flex flex-col justify-between'>
        <p>Promo code: <strong>{promoCode}</strong></p>
        <p>Discount value: <strong>{discountValue} %</strong></p>
        <p>Expires in: <strong>{fromISOSToReadable(expiresIn)}</strong></p>
      </div>
      <div className='flex flex-col justify-between'>
        <p>Created at: <strong>{fromISOSToReadable(created_at)}</strong></p>
        <p>Updated at: <strong>{fromISOSToReadable(updated_at)}</strong></p>
      </div>
    </div>
  );
};

