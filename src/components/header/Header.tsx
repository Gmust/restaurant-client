'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Account } from '@/src/components/header/Account';
import { MobileRoutes } from '@/src/components/header/MobileRoutes';
import { RouteItem } from '@/src/components/header/RouteItem';
import { Button } from '@/src/components/shared/Button';
import { ShoppingCart } from '@/src/components/shoppingCart/ShoppingCart';
import { useScreenSize } from '@/src/hooks/screen-size-hook';
import { AuthService } from '@/src/service/authService';
import { useCartStore } from '@/src/store/cart-store';
import { useUserStore } from '@/src/store/user-store';
import { routes } from '@/src/utils/routes';

import { Logo } from './Logo';


export const Header = () => {
  const { isAuth, user, actions: { setUser, setIsAuth, removeUser } } = useUserStore();
  const { width, height } = useScreenSize();
  const { actions: { clearCart, setCart } } = useCartStore();
  const router = useRouter();

  useEffect(() => {

    const handleSuccess = (response: any) => {
      setUser(response.user);
      setIsAuth(true);
      setCart(response.user.cart);
    };

    const fetchRefresh = async () => {
      try {
        const response = await AuthService.checkIsAuth();
        if (response.user.statusCode === 403 || response.user.statusCode === 500) {
          await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth-next/token`, { method: 'GET' });
          const response = await AuthService.checkIsAuth();
          if (response.user.statusCode === 403 || response.user.statusCode === 500) {
            setIsAuth(false);
            removeUser();
            window.history.replaceState(null, '', '/');
          } else {
            handleSuccess(response);
          }
        } else {
          handleSuccess(response);
        }
      } catch (e) {
        setIsAuth(false);
        console.error(e);
      }
    };

    fetchRefresh();
  }, []);

  return (
    <header className='animate-fadeInTop bg-inherit  flex justify-between items-center p-3 px-12 text-2xl sm:text-lg'>
      <div className='relative w-16 h-16'>
        <Logo />
      </div>
      {
        width < 780 ?
          <MobileRoutes />
          :
          <nav className='flex justify-between space-x-6'>
            {
              routes.map(route => <RouteItem path={route.path} name={route.name} key={route.path} />)
            }
          </nav>
      }

      <div className='flex items-center justify-between space-x-4'>
        {
          width < 780 ?
            null
            : isAuth && user
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

