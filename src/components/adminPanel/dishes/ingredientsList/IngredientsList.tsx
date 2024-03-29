import { Tooltip } from '@/src/components/shared/Tooltip';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { IIngredient } from '@/@types/ingredients';
import { LuArrowRightSquare } from 'react-icons/lu';
import { cn } from '@/src/lib/utils';
import { PiDotsNine } from 'react-icons/pi';
import { Simulate } from 'react-dom/test-utils';
import dragOver = Simulate.dragOver;
import { IngredientItem } from '@/src/components/adminPanel/dishes/ingredientsList/IngredientItem';
import { IngredientItemsContainer } from '@/src/components/adminPanel/dishes/ingredientsList/IngredientItemsContainer';


interface IIngredientsList {
  setPickedIngredients: Dispatch<SetStateAction<IIngredient[]>>;
  allIngredients: IIngredient[];
  pickedIngredients: IIngredient[];
}

export const IngredientsList = ({ setPickedIngredients, allIngredients, pickedIngredients }: IIngredientsList) => {

  const [isListOpened, setIsListOpened] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<IIngredient[] | []>(allIngredients);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: string) => {
    let ingredientFromList = ingredients.find(item => item._id = id);
    if (ingredientFromList && !pickedIngredients.find(item => item._id = id)) {
      const newIngredientsList = ingredients.filter(item => item._id != id);
      setIngredients(newIngredientsList);
      setPickedIngredients([...pickedIngredients, ingredientFromList]);
    }

  };

  return (
    <div className='flex flex-col pl-4 relative'>
      <span className='flex space-x-2'>
        <h1>Picked ingredients:</h1>
        <Tooltip tooltipText='Open list' position='top'>
          <LuArrowRightSquare size={30} color='black' className='active:scale-110 transition duration-150'
                              onClick={() => setIsListOpened(prevState => !prevState)} />
        </Tooltip>
      </span>
      <IngredientItemsContainer handleUpdateList={handleUpdateList} ingredients={pickedIngredients}
                                isDragging={isDragging} handleDragging={handleDragging} />
      <div className={cn('absolute ml-60 bg-white p-2 rounded-md w-full', {
        'flex flex-col animate-fadeInTop': isListOpened,
        'hidden': !isListOpened,
      })}>
        <h3>Ingredients list:</h3>
        <div className='flex flex-col divide-y-2 mt-2 shadow-2xl shadow-black'>
          <IngredientItemsContainer handleUpdateList={handleUpdateList} ingredients={ingredients}
                                    isDragging={isDragging} handleDragging={handleDragging} />
        </div>
      </div>
    </div>
  );
};

