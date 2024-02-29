'use client';

import toast from 'react-hot-toast';
import { BookingService } from '@/src/service/bookingService';
import { Button } from '@/src/components/shared/Button';
import { useRouter } from 'next/navigation';

type ConfirmReservationSearchParams = {
  email: string,
  t: string,
  reservationId: string
}

type Props = {
  params: {},
  searchParams: ConfirmReservationSearchParams,
}


const ConfirmReservationPage = (props: Props) => {

  const router = useRouter();

  const handleProceedReservation = async (confirmed: boolean) => {
    try {
      const response = await BookingService.confirmReservation({
        confirmed: confirmed,
        email: props.searchParams.email,
        tableNum: props.searchParams.t,
        reservationId: props.searchParams.reservationId,
      });
      if (!response) {
        toast.error('Something went wrong');
      } else {
        toast.success(response.message);
        setTimeout(() => {
          toast.success('You will be redirected now...');
          router.push('/menu');
        }, 1000);
        toast.success(response.message);
      }
    } catch (e: any) {
      toast.error(e);
    }
  };


  return (
    <div className='flex items-center justify-center h-4/6'>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>Confirm reservation?</h2>
        <div className='flex justify-between'>
          <Button onClick={() => handleProceedReservation(true)} size='lg'>Yes</Button>
          <Button onClick={() => handleProceedReservation(false)} size='lg'>No</Button>
        </div>
      </div>
    </div>
  );
};


export default ConfirmReservationPage;
