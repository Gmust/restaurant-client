import { IIngredient } from '@/@types/ingredients';
import { IngredientItem } from '@/src/components/adminPanel/dishes/ingredientsList/IngredientItem';
import React from 'react';


interface IIngredientItemsContainerProps {
  ingredients: IIngredient[],
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: string) => void;
}

export const IngredientItemsContainer = ({
                                           isDragging,
                                           handleDragging,
                                           ingredients,
                                           handleUpdateList,
                                         }: IIngredientItemsContainerProps) => {

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
    <div className='flex flex-col max-w-[150px]'
         onDragOver={handleDragOver}
         onDrop={handleDrop}>
      {ingredients.length > 0 ?
        ingredients.map(item => <IngredientItem ingredient={item} isDragging={isDragging}
                                                handleDragging={handleDragging}
                                                key={item._id} />)
        : <p className='max-w-[200px] text-sm text-gray-400'>Add new ingredients from the right-side list</p>
      }
    </div>
  );
};

