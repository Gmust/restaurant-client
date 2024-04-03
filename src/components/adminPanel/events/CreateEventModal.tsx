import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import { z } from 'zod';
import { createEventValidator } from '@/src/lib/validations/create-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '@/src/components/shared/CustomInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/src/components/shared/Button';
import { EventsService } from '@/src/service/eventsService';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ICreateEventModalProps {
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean,
  setEvents: Dispatch<SetStateAction<IEvent[]>>
}


type formData = z.infer<typeof createEventValidator>;

export const CreateEventModal = ({ setEvents, setIsActive, isActive }: ICreateEventModalProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { register, formState: { errors }, setError, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(createEventValidator),
    mode: 'all',
  });

  const onSubmit = async (formData: formData) => {
    if (!startDate) {
      setError('startDate', {
        type: 'required',
        message: 'Start date is required',
      });
    }
    if (!endDate) {
      setError('endDate', {
        type: 'required',
        message: 'End date is required',
      });
    }
    if (startDate! < new Date()) {
      setError('startDate', {
        type: 'value',
        message: 'You can`t create event in the past!',
      });
    }
    if (endDate! < startDate!) {
      setError('endDate', {
        type: 'valueAsDate',
        message: 'The end date cannot precede the start date',
      });
    }
    if (startDate! === startDate!) {
      setError('endDate', {
        type: 'valueAsDate',
        message: 'You cannot create events that start and end at the same time!',
      });
    }
    setIsLoading(true);
    try {
      const response = await EventsService.createEvent({
        name: formData.name,
        description: formData.description,
        startDate: startDate!.toISOString()!,
        endDate: endDate!.toISOString(),
      });
      toast.success(response.message);
      setEvents(prevState => [...prevState, response.newEvent]);
      reset();
      setStartDate(null);
      setEndDate(null);
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
      <div>
        <h1 className='text-2xl font-semibold'>Create new event:</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-xl font-medium'>Name:</label>
            <CustomInput id='name' {...register('name')} variant='rounded' placeholder='Cool event...' />
            <p className='text-red-700 font-semibold'>{errors.name && errors.name.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' {...register('description')} rows={4}
                      className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            <p className='text-red-700 font-semibold'>{errors.description && errors.description.message}</p>
          </div>
          <div className='flex space-x-8'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-xl font-medium'>Set start
                date: {startDate?.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</label>
              <div>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect inline />
              </div>
              <p
                className='text-red-700 font-semibold'>{errors.startDate && errors.startDate?.type !== 'valueAsDate' && errors.startDate.message}</p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-xl font-medium'>Set end
                date: {endDate?.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</label>
              <div>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect inline />
              </div>
              <p
                className='text-red-700 font-semibold'>{errors.endDate && errors.endDate?.type !== 'valueAsDate' && errors.endDate.message}</p>
            </div>

          </div>
          <p
            className='text-red-700 font-semibold'>{errors.endDate?.type == 'valueAsDate' && errors.endDate.message}</p>
          <Button type='submit' isLoading={isLoading}>
            Create Event
          </Button>
        </form>
      </div>
    </Modal>
  );
};

