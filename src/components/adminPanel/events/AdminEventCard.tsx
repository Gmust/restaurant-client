import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DeleteEventModal } from '@/src/components/adminPanel/events/DeleteEventModal';
import { UpdateEventModal } from '@/src/components/adminPanel/events/UpdateEventModal';
import { UpdateDeleteButtons } from '@/src/components/shared/UpdateDeleteButtons';


interface IAdminEventCardProps {
  event: IEvent,
  setEvents: Dispatch<SetStateAction<IEvent[]>>,
  events: IEvent[]
}

export const AdminEventCard = ({
                                 setEvents,
                                 event,
                                 events,
                               }: IAdminEventCardProps) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <div className='w-full flex flex-col justify-between p-2 m-3 bg-a border-2 border-amber-600 rounded-lg cursor-pointer bg-amber-700 text-white
        hover:scale-105 hover:shadow-lg transition duration-200'>
        <div className='flex justify-between'>
          <div>
            <p className='font-bold text-lg'>{event.name}</p>
            <p className='text-md max-w-48 line-clamp-3 '>{event.description}</p>
          </div>
          <div className='flex space-x-4'>
            <UpdateDeleteButtons setIsEdit={setIsEdit} setIsDelete={setIsDelete} buttonsSize='md' />
          </div>
        </div>
        <span className='flex flex-row justify-between space-x-6'>
            <div className='flex flex-col'><b>Start:</b> {new Date(event.startDate).toLocaleDateString()}</div>
            <div className='flex flex-col'><b>End:</b> {new Date(event.endDate).toLocaleDateString()}</div>
        </span>
      </div>
      <UpdateEventModal setEvents={setEvents} events={events} event={event} setIsEdit={setIsEdit} isEdit={isEdit} />
      <DeleteEventModal setIsActive={setIsDelete} isActive={isDelete} eventId={event._id} setEvents={setEvents} />
    </>
  );
};

