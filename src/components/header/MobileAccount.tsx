import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import { RiAdminFill, RiLogoutCircleLine } from 'react-icons/ri';

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
      <p className='text-4xl font-semibold'>Your account</p>
      <div
        className='flex flex-col bg-white text-3xl text-black right-6 justify-start rounded-b-lg rounded-l-lg  ml-4 space-y-3'>
        <div>Welcome {user?.firstName}!</div>
        <div className='flex flex-col justify-between space-y-2 ml-4'>
          <Link href='/user/account-info' prefetch={true}>
            <button className='flex items-center space-x-2'>
              <FaInfoCircle className='text-blue-600' />
              <p>Account info</p>
            </button>
          </Link>
          {
            user?.role === 'Administrator' &&
            <Link href='/admin-panel'>
              <button className='flex items-center space-x-2'>
                <RiAdminFill />
                <p>Admin panel</p>
              </button>
            </Link>
          }
          <Link href='/'>
            <button className='flex items-center space-x-2'>
              <RiLogoutCircleLine />
              <p>Logout</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

