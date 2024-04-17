import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { LuArrowRightSquare } from 'react-icons/lu';
import { PiDotsNine } from 'react-icons/pi';

import { IIngredient } from '@/@types/ingredients';
import { Tooltip } from '@/src/components/shared/Tooltip';
import { cn } from '@/src/lib/utils';
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
  const [ingredients, setIngredients] = useState<IIngredient[] | []>(allIngredients.filter(item => !pickedIngredients.find(rm => rm._id === item._id)));
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);



  const handleUpdatePickedList = (id: string) => {
    let ingredientFromList = ingredients.find(item => item._id === id);
    if (ingredientFromList && !pickedIngredients.find(item => item._id === id)) {
      const newIngredientsList = ingredients.filter(item => item._id !== id);
      setIngredients(newIngredientsList);
      setPickedIngredients([...pickedIngredients, ingredientFromList]);
    }
  };

  const handleUpdateIngredientsList = (id: string) => {
    const ingredientFromList = pickedIngredients.find(item => item._id === id);
    if (ingredientFromList && !ingredients.find(item => item._id === id)) {
      const newIngredientsList = pickedIngredients.filter(item => item._id !== id);
      setPickedIngredients(newIngredientsList);
      setIngredients([...ingredients, ingredientFromList]);
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
      <IngredientItemsContainer handleUpdateList={handleUpdatePickedList} ingredients={pickedIngredients}
                                isDragging={isDragging} handleDragging={handleDragging} />
      <div className={cn('absolute ml-60 bg-white p-2 rounded-md w-full', {
        'flex flex-col animate-fadeInTop': isListOpened,
        'hidden': !isListOpened,
      })}>
        <h3>Ingredients list:</h3>
        <div className='flex flex-col divide-y-2 mt-2 shadow-2xl shadow-black'>
          <IngredientItemsContainer handleUpdateList={handleUpdateIngredientsList} ingredients={ingredients}
                                    isDragging={isDragging} handleDragging={handleDragging} />
        </div>
      </div>
    </div>
  );
};

