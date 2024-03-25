'use client';

import { IDish } from '@/@types/dishes';
import { useState } from 'react';
import { Input } from 'postcss';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { Edit2, SearchIcon, Trash } from 'lucide-react';
import { FiSearch } from 'react-icons/fi';
import { DishCard } from '@/src/components/shared/DishCard';
import { Button } from '@/src/components/shared/Button';
import { DishAdminCard } from '@/src/components/adminPanel/dishes/DishAdminCard';

interface IDishesListProps {
  initialDishes: IDish[];
}

export const DishesList = ({ initialDishes }: IDishesListProps) => {

  const [dishes, setDishes] = useState<IDish[]>(initialDishes);


  return (
    <div className='flex flex-col'>
      <div>
        <CustomInput Icon={FiSearch} />
      </div>
      <div className='grid grid-cols-2 overflow-y-auto  gap-2 p-2 max-h-[550px]'>
        {dishes.map(dish =>
          <DishAdminCard dish={dish} key={dish._id}/>
        )}
      </div>
    </div>
  );
};

