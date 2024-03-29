import { PiDotsNine } from 'react-icons/pi';
import React from 'react';
import { IIngredient } from '@/@types/ingredients';

interface IIngredientItemProps {
  ingredient: IIngredient,
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
}

export const IngredientItem = ({ ingredient, isDragging, handleDragging }: IIngredientItemProps) => {

  const handleDragEnd = () => handleDragging(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${ingredient._id}`);
    handleDragging(true);
  };

  return (
    <div className='flex space-x-1 items-center cursor-pointer' draggable={true} onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}>
      <p>
        {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}
      </p>
      <p>
        {ingredient.quantity}
        {ingredient.unit}
      </p>
      <PiDotsNine size={25} color='black' />
    </div>
  );
};

