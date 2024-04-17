import React from 'react';

import { IDish } from '@/@types/dishes';
import { DishAdminCard } from '@/src/components/adminPanel/dishes/DishAdminCard';
import { SpecialtiesDishCard } from '@/src/components/adminPanel/specialties-menu/SpecialtiesDishCard';
import { DishCard } from '@/src/components/shared/DishCard';

interface IDishItemsContainerProps {
  dishes: IDish[],
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: string) => void;
}


export const DishItemsContainer = ({
                                     isDragging,
                                     handleDragging,
                                     dishes,
                                     handleUpdateList,
                                   }: IDishItemsContainerProps) => {

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    handleUpdateList(id);
    handleDragging(false);
  };

  return (
    <div className='flex flex-col space-y-2 p-3' onDragOver={handleDragOver} onDrop={handleDrop}>
      {
        dishes.length > 0 ? dishes.map(dish => <SpecialtiesDishCard dish={dish} key={dish._id} isDragging={isDragging}
                                                                    handleDragging={handleDragging} />)
          : <p className='max-w-[200px] text-sm text-gray-400'>Add new dishes from the right-side list</p>
      }
    </div>
  );
};
