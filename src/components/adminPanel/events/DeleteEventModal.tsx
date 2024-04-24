import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { IIngredient } from '@/@types/ingredients';
import { Button } from '@/src/components/shared/Button';
import { Modal } from '@/src/components/shared/Modal';
import { EventsService } from '@/src/service/eventsService';


interface IDeleteEvent {
  setIsActive: Dispatch<SetStateAction<boolean>>
  isActive: boolean,
  eventId: string,
  setEvents: Dispatch<SetStateAction<IEvent[]>>
}

export const DeleteEventModal = ({ eventId, isActive, setIsActive, setEvents }: IDeleteEvent) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteEvent = async () => {
    setIsLoading(true);
    try {
      const response = await EventsService.deleteEvent(eventId);
      toast.success(response.message);
      setEvents(prevState => {
        return prevState.filter(event => event._id !== eventId);
      });
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
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col items-center space-y-6'>
        <p>Are you sure you want to remove this event?</p>
        <div className='flex justify-around w-full'>
          <Button className='bg-emerald-700 hover:bg-emerald-600' onClick={handleDeleteEvent} isLoading={isLoading}
                  disabled={isLoading}>
            Yes
          </Button>
          <Button className='bg-red-600 hover:bg-red-500' onClick={() => setIsActive(false)} disabled={isLoading}
                  isLoading={isLoading}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

