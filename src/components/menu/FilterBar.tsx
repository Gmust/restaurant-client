'use client';

import { DishCategories } from '@/@types/dishes';
import { Vegan } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const FilterBar = () => {

  const [isVegan, setIsVegan] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const dishesOptions = Object.values(DishCategories);


  return (
    <filter className='animate-fadeInBottom flex flex-row justify-around mx-10 w-full'>
      <div className='flex relative items-center space-x-2 text-xl border-b-2 border-gray-50 border-opacity-70 '>
        <label htmlFor='isVegan' className='cursor-pointer'>Is vegan:</label>
        <input type='checkbox' title='Is Vegan' id='isVegan' checked={isVegan}
               className='appearance-none w-4 h-4 mt-1 cursor-pointer' onChange={() => setIsVegan(!isVegan)} />
        <Vegan style={{ marginLeft: '90px' }} color={isVegan ? '#3e9392' : 'white'}
               className='absolute w-5 h-5 pointer-events-none' />
      </div>

      <div className='flex flex-row  justify-around items-center w-1/5'>
        <label htmlFor='dish-category' className='text-xl'>Select category:</label>
        <select id='dish-category' title='Dish category' defaultValue='All'
                className='block py-1 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          <option>All</option>
          {dishesOptions.map(dishOption =>
            <option value={dishOption} key={dishOption}>{dishOption}</option>,
          )}
        </select>
      </div>
    </filter>
  );
};

