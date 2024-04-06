import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import { CustomInput } from '@/src/components/shared/CustomInput';
import DatePicker from 'react-datepicker';
import { Button } from '@/src/components/shared/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateEventValidator } from '@/src/lib/validations/update-event';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { EventsService } from '@/src/service/eventsService';
import { handleUpdateData } from '@/src/lib/handleUpdateData';

interface IUpdateEventModal {
  isEdit: boolean,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  events: IEvent[],
  setEvents: Dispatch<SetStateAction<IEvent[]>>,
  event: IEvent
}

type formData = z.infer<typeof updateEventValidator>

export const UpdateEventModal = ({ isEdit, setIsEdit, events, setEvents, event }: IUpdateEventModal) => {

  const [newStartDate, setNewStartDate] = useState<Date>(new Date(event.startDate));
  const [newEndDate, setNewEndDate] = useState<Date>(new Date(event.endDate));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, register, reset, formState: { errors, isValid }, setError } = useForm<formData>({
    resolver: zodResolver(updateEventValidator),
    mode: 'all',
    defaultValues: {
      description: event.description,
      name: event.name,
    },
  });

  const onSubmit = async (formData: formData) => {
    setIsLoading(true);
    try {
      const response = await EventsService.updateEvent({
        eventId: event._id,
        name: formData.name!,
        description: formData.description!,
        startDate: newStartDate,
        endDate: newEndDate,
      });
      handleUpdateData({
        setData: setEvents,
        updatedData: response.event,
        data: events,
      });
      toast.success(response.message);
      reset();
      setIsEdit(false);
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
    <Modal setIsActive={setIsEdit} isActive={isEdit}>
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
                date: {newStartDate?.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</label>
              <div>
                <DatePicker selected={newStartDate} onChange={(date) => setNewStartDate(date!)} showTimeSelect inline />
              </div>
              <p
                className='text-red-700 font-semibold'>{errors.startDate && errors.startDate?.type !== 'valueAsDate' && errors.startDate.message}</p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-xl font-medium'>
                Set end date: {newEndDate?.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</label>
              <div>
                <DatePicker selected={newEndDate} onChange={(date) => setNewEndDate(date!)} showTimeSelect inline />
              </div>
              <p
                className='text-red-700 font-semibold'>{errors.endDate && errors.endDate?.type !== 'valueAsDate' && errors.endDate.message}</p>
            </div>

          </div>
          <p
            className='text-red-700 font-semibold'>{errors.endDate?.type == 'valueAsDate' && errors.endDate.message}</p>
          <Button type='submit' isLoading={isLoading} disabled={!newStartDate || !newEndDate || !isValid}>
            Create Event
          </Button>
        </form>
      </div>
    </Modal>
  );
};

