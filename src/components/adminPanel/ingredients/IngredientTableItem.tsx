import { Edit2, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { IIngredient } from '@/@types/ingredients';
import { DeleteIngredientModal } from '@/src/components/adminPanel/ingredients/DeleteIngredientModal';
import { UpdateIngredientsModal } from '@/src/components/adminPanel/ingredients/UpdateIngredientsModal';
import { Button } from '@/src/components/shared/Button';
import { UpdateDeleteButtons } from '@/src/components/shared/UpdateDeleteButtons';
import { capitalizeFirstLetter } from '@/src/lib/utils';


interface IIngredientTableItem {
  ingredient: IIngredient,
  setIngredients: Dispatch<SetStateAction<IIngredient[]>>,
  ingredients: IIngredient[]
}

export const IngredientTableItem = ({
                                      ingredients,
                                      ingredient: { unit, _id, name, quantity },
                                      setIngredients,
                                    }: IIngredientTableItem) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <tr className='text-xl bg-white border-b '>
        <td
          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>{capitalizeFirstLetter(name)}</td>
        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>{quantity}</td>
        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>{unit}</td>
        <td className='px-6 py-4 font-medium text-gray-900 flex flex-col space-y-2'>
          <UpdateDeleteButtons setIsEdit={setIsEdit} setIsDelete={setIsDelete} buttonsSize={'sm'}/>
        </td>
      </tr>
      <DeleteIngredientModal setIsActive={setIsDelete} isActive={isDelete} ingredientId={_id}
                             setIngredients={setIngredients} />
      <UpdateIngredientsModal setIngredients={setIngredients} setIsActive={setIsEdit} isActive={isEdit}
                              ingredient={{ quantity, _id, name, unit }} ingredients={ingredients} />
    </>
  );
};

