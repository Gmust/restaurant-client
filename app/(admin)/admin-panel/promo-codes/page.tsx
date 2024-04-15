import { PromoCodesService } from '@/src/service/promoCodesService';
import { PromoCodesList } from '@/src/components/adminPanel/promo-codes/PromoCodesList';

const PromoCodesPage = async () => {

  const promoCodes = await PromoCodesService.getAllPromoCodes();

  return (
    <div className='flex flex-col text-black text-2xl p-2'>
      <h2 className='font-semibold text-3xl'>Available promo codes:</h2>
      <PromoCodesList promoCodes={promoCodes} />
    </div>
  );
};

export default PromoCodesPage;
