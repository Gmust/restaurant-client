'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { IAvailableTime, ReservationTime } from '@/@types/bookings';
import { Button } from '@/src/components/shared/Button';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { cn } from '@/src/lib/utils';
import { createBookingValidator } from '@/src/lib/validations/create-booking';
import { BookingService } from '@/src/service/bookingService';
import { TablesService } from '@/src/service/tablesService';
import { availableReservations } from '@/src/utils/availableReservations';

interface IBookingInfoProps {
  tableNum: number,
  numberOfSeats: number,
  setIsActive: Dispatch<SetStateAction<boolean>>
}

type formData = z.infer<typeof createBookingValidator>


export const BookingInfo = ({ tableNum, numberOfSeats, setIsActive }: IBookingInfoProps) => {

  const [isLoading, setIsLoading] = useState<boolean>();
  const [reservations, setReservations] = useState<IAvailableTime[]>(availableReservations);
  const [selectedTime, setSelectedTime] = useState<ReservationTime | null>(null);
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<formData>({
    resolver: zodResolver(createBookingValidator),
  });

  const onSubmit = async ({ amountOfVisitors, email }: formData) => {
    setIsLoading(true)
    try {
      const newBooking = await BookingService.createReservation({
        amountOfVisitors,
        email,
        timeOfReservation: selectedTime!,
        table: tableNum,
      });

        setIsActive(false);
        toast.success(newBooking!.message);
    } catch (e: any) {
      if(e instanceof AxiosError){
        toast.error(e.response!.data.message);
      }else{
        toast.error('Something went wrong')
      }
      console.error(e);
    }finally {
      setIsLoading(false)
    }
  };

  const handleSelectTime = (time: ReservationTime, isAvailable: boolean) => {
    if (isAvailable) {
      setSelectedTime(time);
    }
  };

  useEffect(() => {
    const fetchTableInfo = async () => {
      setIsLoading(true);
      try {
        const table = await TablesService.fetchTableByNum(tableNum);
        if (!table) {
          toast('Error occurred, try again later ');
        } else {
          const reservationInfo = await BookingService.fetchAllReservations(table._id);
          if (reservationInfo && reservationInfo.length > 0) {
            setReservations(prevState => {
              return prevState.map(reservationTime => {
                for (let i = 0; i < reservationInfo.length; i++) {
                  if (reservationTime.time === reservationInfo[i].timeOfReservation) {
                    return { ...reservationTime, isAvailable: false };
                  }
                }
                return reservationTime;
              });
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableInfo();
  }, []);


  return (
    <div className='flex justify-between space-x-10'>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(onSubmit)}>
        <p className='text-2xl'>Table number: {tableNum}</p>
        <div>
          <label htmlFor='email'>Email:</label>
          <CustomInput id='email' {...register('email')} className='rounded-md' />
          <p className='text-red-700 font-semibold text-lg animate-fadeInBottom'>
            {errors.email && errors.email.message}
          </p>
        </div>
        <div>
          <label htmlFor='amount-of-visiors'>Amount of visitors</label>
          <CustomInput id='amount-of-visiors' {...register('amountOfVisitors', {
            required: true,
            min: 1,
            max: numberOfSeats,
          })} type='number' defaultValue={1} min={1} max={numberOfSeats} className='rounded-md' />
          <p className='text-red-700 font-semibold text-lg animate-fadeInBottom'>
            {errors.amountOfVisitors && 'Select amount of visitors'}
          </p>
        </div>
        <Button type='submit' disabled={selectedTime ? false : true || isValid || isLoading} isLoading={isLoading}
                className='disabled:cursor-not-allowed'>
          Create booking
        </Button>
      </form>
      <div>
        <h2>Choose reservation time</h2>
        <div className='flex flex-col overflow-auto max-h-96'>
          {reservations.map(reservation =>
            <p className={cn('border border-black p-1', {
              'text-gray-400 text-opacity-60 cursor-not-allowed': reservation.isAvailable === false,
              'hover:bg-emerald-400 bg-opacity-60 cursor-pointer': reservation.isAvailable === true,
              'bg-amber-400 bg-opacity-60': reservation.time === selectedTime,
            })} onClick={() => handleSelectTime(reservation.time, reservation.isAvailable)} key={reservation.time}>
              {reservation.time}
            </p>,
          )}
        </div>
      </div>
    </div>
  );
};

