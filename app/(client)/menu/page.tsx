import { FilterBar } from '@/src/components/menu/FilterBar';

const MenuPage = () => {
  return (
    <div className='flex flex-col items-center space-y-6'>
      <FilterBar />
      <span className='bg-gray-300 opacity-80 h-0.5 w-11/12'></span>

    </div>
  );
};

export default MenuPage;
