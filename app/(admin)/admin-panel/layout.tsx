import { Metadata, Viewport } from 'next';
import Link from 'next/link';

import { adminPanelRoutes } from '@/src/utils/routes';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Panel',
    default: 'Admin Panel'
  },
  description: 'Admin panel',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.1,
};

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex mx-12 mt-5 justify-between space-x-10'>
      <div className='bg-white px-4 py-5 rounded-md'>
        <nav className='flex flex-col space-y-4'>
          {adminPanelRoutes.map(({ Icon, name, path }) =>
            <Link href={`/admin-panel/${path}`} key={name}
                  className='group bg-inherit hover:scale-105 transition duration-300 text-black space-x-1 text-2xl'>
              <div className='flex items-center space-x-1'>
                <p>
                  {name}
                </p>
                <Icon />
              </div>
              <span
                className='block max-w-0 group-hover:max-w-full transition-all duration-300 h-1 bg-amber-600'></span>
            </Link>,
          )}
        </nav>
      </div>
      <div className='w-full bg-white rounded-md'>
        {children}
      </div>
    </section>
  );
};
export default AdminPanelLayout;
