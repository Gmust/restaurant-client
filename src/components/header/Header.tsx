'use client';

import { routes } from '@/src/utils/routes';
import { RouteItem } from '@/src/components/header/RouteItem';
import { Logo } from './Logo';
import { Account } from '@/src/components/header/Account';
import { Button } from '@/src/components/shared/Button';
import { ShoppingCart } from '@/src/components/shoppingCart/ShoppingCart';
import { useUserStore } from '@/src/store/user-store';
import Link from 'next/link';
import { useEffect } from 'react';
import { AuthService } from '@/src/service/authService';
import { cookies } from 'next/headers';


export const Header = () => {
  const { isAuth, user } = useUserStore();

  useEffect(() => {

    const fetchRefresh = async () => {
      try {
        const response = await AuthService.getUserByToken();
      } catch (e) {
        console.error(e);
      }
    };

    fetchRefresh();

  }, []);

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
          isAuth && user
            ? <Account user={user} />
            : <Link href='/login'>
              <Button variant='outlined'>Log in</Button>
            </Link>
        }
        <ShoppingCart />
      </div>
    </header>
  );
};

