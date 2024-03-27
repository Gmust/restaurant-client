import { Tooltip } from '@/src/components/shared/Tooltip';
import { BiRightArrow } from 'react-icons/bi';
import { Dispatch, SetStateAction, useState } from 'react';
import { IIngredient } from '@/@types/ingredients';
import { LuArrowRightSquare } from 'react-icons/lu';
import { cn } from '@/src/lib/utils';
import { PiDotsNine } from 'react-icons/pi';


interface IIngredientsList {
  setPickedIngredients: SetStateAction<Dispatch<IIngredient[]>>;
  allIngredients: IIngredient[];
  pickedIngredients: IIngredient[];
}

export const IngredientsList = ({ setPickedIngredients, allIngredients, pickedIngredients }: IIngredientsList) => {

  const [isListOpened, setIsListOpened] = useState<boolean>(false);

  return (
    <div className='flex flex-col pl-4 relative'>
      <span className='flex space-x-2'>
        <h1>Picked ingredients:</h1>
        <Tooltip tooltipText='Open list' position='top'>
          <LuArrowRightSquare size={30} color='black' className='active:scale-110 transition duration-150'
                              onClick={() => setIsListOpened(prevState => !prevState)} />
        </Tooltip>
      </span>
      <div className='flex flex-col'>
        {
          pickedIngredients.length > 0 ?
            <div></div> :
            <p className='max-w-[200px] text-sm text-gray-400'>Add new ingredients from the right-side list</p>
        }
      </div>
      <div className={cn('absolute ml-60 bg-white p-2 rounded-md w-full', {
        'flex flex-col animate-fadeInTop': isListOpened,
        'hidden': !isListOpened,
      })}>
        <h3>Ingredients list:</h3>
        <div className='flex flex-col divide-y-2 mt-2 shadow-2xl shadow-black'>
          {allIngredients.map(ingredient =>
            <div className='flex space-x-1 items-center cursor-pointer'>
              <p>
                {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}
              </p>
              <p >
                {ingredient.quantity}
                {ingredient.unit}
              </p>
              <PiDotsNine size={25} color='black'/>
            </div>,
          )}
        </div>
      </div>
    </div>
  );
};

