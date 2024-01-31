import { SquareUserRound } from 'lucide-react';
import { Button } from '@/src/components/shared/Button';
import Link from 'next/link';

export const Account = () => {

  const user = {
    email: 'test@gmail.com',
    role: 'Administrator',
    firstName: 'User',
  };

  return (
    <div className='group relative w-full'>
      <SquareUserRound className='cursor-pointer w-10 h-10' />
      <div
        className='absolute hidden items-center group-hover:flex-col group-hover:flex bg-white text-black right-6 w-36 rounded-b-lg rounded-l-lg'>
        <div>Welcome {user.firstName}!</div>
        <div className='divide-x-4'></div>
        <Link href='account-info' className='w-full'>
          <Button variant='ghost' size='sm' className='w-full rounded-none'>Account info</Button>
        </Link>
        {
          user.role === 'Administrator' &&
          <Link href='admin-panel' className='w-full'>
            <Button variant='ghost' size='sm' className='w-full rounded-t-none rounded-b-md'>Admin panel</Button>
          </Link>
        }
      </div>
    </div>
  );
};

