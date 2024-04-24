import { PanelRightClose } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { MobileAccount } from '@/src/components/header/MobileAccount';
import { RouteItem } from '@/src/components/header/RouteItem';
import { Button } from '@/src/components/shared/Button';
import { cn } from '@/src/lib/utils';
import { useUserStore } from '@/src/store/user-store';
import { routes } from '@/src/utils/routes';

export const MobileRoutes = () => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const { isAuth, user } = useUserStore();

  return (
    <div>
      <GiHamburgerMenu size={50} onClick={() => setIsShow(true)} />
      {isShow && (
        <div className='fixed top-0 left-0 z-10 w-full h-full bg-black opacity-50'
             onClick={() => setIsShow(false)}></div>
      )}
      <nav
        className={cn('fixed top-0 right-0 z-20 w-72 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg text-black p-3 space-y-3', {
          'translate-x-0': isShow,
        })}>
        <div className='flex justify-between'>
          <p className='text-4xl font-semibold'>Navigation</p>
          <Button variant='ghost' className='hover:bg-transparent hover:scale-105' onClick={() => setIsShow(false)}>
            <PanelRightClose color='black' />
          </Button>
        </div>
        <nav className='flex flex-col justify-between ml-3 space-y-1 text-3xl'>
          {
            routes.map(route => <RouteItem path={route.path} name={route.name} key={route.path} />)
          }
        </nav>
        <div className='flex flex-col justify-between'>
          {
            isAuth ? <MobileAccount />
              : <Link href='/login'>
                <Button variant='outlined'>Log in</Button>
              </Link>
          }
        </div>
      </nav>
    </div>
  );
};

