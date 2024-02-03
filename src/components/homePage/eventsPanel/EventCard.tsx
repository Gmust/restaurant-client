import Link from 'next/link';

export const EventCard = ({ name, description, startDate, endDate, _id }: IEvent) => {
  return (
    <Link href={`/events/event/${_id}`} as={`${name.split(' ').join('-').toLowerCase()}`}
          className='flex flex-col justify-between p-2 m-3 border-2 border-amber-600 rounded-lg cursor-pointer hover:border-red-900 hover:bg-red-900  hover:scale-105 hover:shadow-lg transition  duration-200 hover:animate-pulse '>
      <p className='font-bold text-lg'>{name}</p>
      <p className='text-md max-w-48 line-clamp-3 '>{description}</p>
      <span className='flex flex-row justify-between space-x-6'>
        <div className='flex flex-col'><b>Start:</b> {new Date(startDate).toLocaleDateString()}</div>
        <div className='flex flex-col'><b>End:</b> {new Date(endDate).toLocaleDateString()}</div>
      </span>
    </Link>
  );
};

