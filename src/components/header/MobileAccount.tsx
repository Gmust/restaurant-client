import Link from 'next/link';

import { Button } from '@/src/components/shared/Button';
import { useUserStore } from '@/src/store/user-store';

export const MobileAccount = () => {

  const { user, actions: { setIsAuth, removeUser } } = useUserStore();

  const handleLogoutButton = async () => {
    setIsAuth(false);
    removeUser();
    const res = await fetch(`/api/auth-next/logout`, { method: 'DELETE' });
  };

  return (
    <div className='flex flex-col'>
      <p className='text-2xl font-semibold'>Your account</p>
      <div
        className='flex flex-col  bg-white text-black right-6 justify-s  rounded-b-lg rounded-l-lg'>
        <div>Welcome {user?.firstName}!</div>
        <div className='divide-x-4'></div>
        <Link href='/user/account-info' prefetch={true} className='w-full'>
          <Button variant='ghost' size='sm' className='w-full rounded-none'>Account info</Button>
        </Link>
        {
          user?.role === 'Administrator' &&
          <Link href='/admin-panel' className='w-full'>
            <Button variant='ghost' className='w-full rounded-t-none rounded-b-md'>Admin panel</Button>
          </Link>
        }
        <Link href='/' className='w-full'>
          <Button variant='ghost' className='w-full rounded-t-none rounded-b-md'
                  onClick={handleLogoutButton}>Logout</Button>
        </Link>
      </div>
    </div>
  );
};

