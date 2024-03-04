'use client';

import { routes } from '@/src/utils/routes';
import { RouteItem } from '@/src/components/header/RouteItem';
import { Logo } from './Logo';
import { Account } from '@/src/components/header/Account';
import { Button } from '@/src/components/shared/Button';
import { ShoppingCart } from '@/src/components/shoppingCart/ShoppingCart';
import { useUserStore } from '@/src/store/user-store';
import Link from 'next/link';


export const Header = () => {
  const { isAuth } = useUserStore();

  return (
    <header className='animate-fadeInTop bg-inherit flex justify-between items-center p-3 px-12 text-2xl sm:text-lg'>
      <div className='relative w-16 h-16'>
        <Logo />
      </div>
      <nav className='flex justify-between space-x-6'>
        {
          routes.map(route => <RouteItem path={route.path} name={route.name} key={route.path} />)
        }
      </nav>
      <div className='flex items-center justify-between space-x-4'>
        {
          isAuth
            ? <Account />
            : <Link href='/login'>
              <Button variant='outlined'>Log in</Button>
            </Link>
        }
        <ShoppingCart />
      </div>
    </header>
  );
};

