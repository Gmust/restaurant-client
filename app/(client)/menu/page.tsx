import { FilterBar } from '@/src/components/menu/FilterBar';
import { DishesService } from '@/src/service/dishesService';
import { MenuList } from '@/src/components/menu/menuList/MenuList';

const MenuPage = async () => {

  const initialMenu = await DishesService.fetchDishes({ queryParams: 'limit=6' });

  return (
    <div className='flex flex-col items-center space-y-6 w-full'>
      <FilterBar />
      <span className='animate-fadeInBottom bg-gray-300 opacity-80 h-0.5 w-11/12'></span>
      <MenuList initialMenu={initialMenu} />
    </div>
  );
};

export default MenuPage;
