import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export const RouteItem = ({ name, path }: IRoute) => {
  return (
      <Link href={path}  className='group bg-inherit hover:scale-105 transition duration-200'>
        {name}
        <span className='block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-rose-800'></span>
      </Link>
  );
};

