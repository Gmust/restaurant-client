import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';


interface IAdminEventCardProps {
  event: IEvent,
  setEvents: Dispatch<SetStateAction<IEvent[]>>,
  events: IEvent[]
}

export const AdminEventCard = ({
                                 setEvents,
                                 event: { _id, endDate, startDate, description, name },
                                 events,
                               }: IAdminEventCardProps) => {


  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <div className='flex'>
        <div className='flex flex-col justify-between p-2 m-3 border-2 border-amber-600 rounded-lg cursor-pointer
        hover:border-red-900 hover:bg-red-900 hover:scale-105 hover:shadow-lg transition duration-200
        hover:animate-pulse'>
          <p className='font-bold text-lg'>{name}</p>
          <p className='text-md max-w-48 line-clamp-3 '>{description}</p>
          <span className='flex flex-row justify-between space-x-6'>
            <div className='flex flex-col'><b>Start:</b> {new Date(startDate).toLocaleDateString()}</div>
            <div className='flex flex-col'><b>End:</b> {new Date(endDate).toLocaleDateString()}</div>
        </span>
        </div>
      </div>
    </>
  );
};

