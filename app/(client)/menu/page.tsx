import { Metadata } from 'next';
import { Suspense } from 'react';

import { MenuSkeleton } from '@/src/components/loaders/MenuSkeleton';
import { FilterBar } from '@/src/components/menu/FilterBar';
import { MenuList } from '@/src/components/menu/menuList/MenuList';
import { DishesService } from '@/src/service/dishesService';



export const metadata: Metadata = {
  title: 'Menu',
  description: 'Restaurant full menu',
};

const MenuPage = async () => {

  const initialMenu = await DishesService.fetchDishes({ queryParams: 'limit=6' });

  return (
    <div className='flex flex-col items-center space-y-6 w-full'>
      <FilterBar />
      <span className='animate-fadeInBottom bg-gray-300 opacity-80 h-0.5 w-11/12'></span>
      <Suspense fallback={<MenuSkeleton itemsAmount={6} />}>
        <MenuList initialMenu={initialMenu} />
      </Suspense>
    </div>
  );
};

export default MenuPage;
