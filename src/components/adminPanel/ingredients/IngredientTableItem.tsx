import { IIngredient } from '@/@types/ingredients';
import { Dispatch, SetStateAction, useState } from 'react';
import { capitalizeFirstLetter } from '@/src/lib/utils';
import { Button } from '@/src/components/shared/Button';
import { Edit2, Trash } from 'lucide-react';
import { DeleteIngredientModal } from '@/src/components/adminPanel/ingredients/DeleteIngredientModal';
import { UpdateIngredientsModal } from '@/src/components/adminPanel/ingredients/UpdateIngredientsModal';


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
          <Button className='bg-emerald-700 hover:bg-emerald-800' size='sm' onClick={() => setIsEdit(true)}>
            <Edit2 />
          </Button>
          <Button className='bg-red-600 hover:bg-red-800' size='sm' onClick={() => setIsDelete(true)}>
            <Trash />
          </Button>
        </td>
      </tr>
      <DeleteIngredientModal setIsActive={setIsDelete} isActive={isDelete} ingredientId={_id}
                             setIngredients={setIngredients} />
      <UpdateIngredientsModal setIngredients={setIngredients} setIsActive={setIsEdit} isActive={isEdit}
                              ingredient={{ quantity, _id, name, unit }} ingredients={ingredients} />
    </>
  );
};

