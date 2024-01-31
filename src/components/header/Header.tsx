import { routes } from '@/src/utils/routes';
import { RouteItem } from '@/src/components/header/RouteItem';
import { Logo } from './Logo';
import { Account } from '@/src/components/header/Account';
import { Button } from '@/src/components/shared/Button';

export const Header = () => {
  const isAuth = true;

  return (
    <header className='w-screen bg-inherit flex justify-between items-center p-3 px-12'>
      <div className='relative w-16 h-16'>
        <Logo />
      </div>
      <nav className='flex justify-between space-x-6'>
        {
          routes.map(route => <RouteItem path={route.path} name={route.name} key={route.path} />)
        }
      </nav>
      <div>
        {isAuth
          ? <Account />
          : <Button variant='outlined'>Log in</Button>
        }
      </div>
    </header>
  );
};

