'use client';

import { Vegan } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { DishCategories } from '@/@types/dishes';

export const FilterBar = () => {

  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<DishCategories>(DishCategories.All);
  const dishesOptions = Object.values(DishCategories);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    searchParams.toString().includes('isVegan=true') && setIsVegan(true);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCurrentCategory(categoryParam as DishCategories);
    }
  }, []);


  const handleGetOnlyVegan = () => {
    setIsVegan(!isVegan);
    router.push(pathname + '?' + createQueryString('isVegan', String(!isVegan)));
  };

  const handleGetCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value as DishCategories);
    if (e.target.value === 'All') {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete('category');
      router.replace(`${pathname}?${nextSearchParams}`);
    } else {
      router.push(pathname + '?' + createQueryString('category', e.target.value));
    }
  };

  return (
    <div className='animate-fadeInBottom flex flex-row  justify-around mx-6 md:mx-10 w-full'>
      <div className='flex relative items-center space-x-2 text-xl border-b-2 border-gray-50 border-opacity-70 '>
        <label htmlFor='isVegan' className='cursor-pointer'>Is vegan:</label>
        <input type='checkbox' title='Is Vegan' id='isVegan' checked={isVegan}
               className='appearance-none w-4 h-4 mt-1 cursor-pointer'
               onChange={() => {
                 handleGetOnlyVegan();
               }} />
        <Vegan style={{ marginLeft: '90px' }} color={isVegan ? '#3e9392' : 'white'}
               className='absolute w-5 h-5 pointer-events-none' data-testid='isVegan-checkbox' />
      </div>

      <div className='flex flex-col items-start md:flex-row md:justify-around md:items-center md:w-1/5'>
        <label htmlFor='dish-category' className='text-xl'>Select category:</label>
        <select id='dish-category' title='Dish category' value={currentCategory}
                onChange={handleGetCategory} data-testid='dish-category'
                className='block py-1 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          {dishesOptions.map(dishOption =>
            <option value={dishOption} key={dishOption}
            >{dishOption}</option>,
          )}
        </select>
      </div>
    </div>
  );
};

