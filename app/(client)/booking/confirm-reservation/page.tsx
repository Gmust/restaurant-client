'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/src/components/shared/Button';
import { BookingService } from '@/src/service/bookingService';

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
        tableNum: Number(props.searchParams.t),
        reservationId: props.searchParams.reservationId,
      });
      setTimeout(() => {
        toast.success('You will be redirected now...');
        router.push('/menu');
      }, 1000);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      }else{
        toast.error('Something went wrong')
      }
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
