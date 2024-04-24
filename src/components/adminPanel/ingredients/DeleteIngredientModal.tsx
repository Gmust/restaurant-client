import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { IIngredient } from '@/@types/ingredients';
import { Button } from '@/src/components/shared/Button';
import { Modal } from '@/src/components/shared/Modal';
import { DishesService } from '@/src/service/dishesService';
import { IngredientsService } from '@/src/service/ingredientsService';

interface IDeleteIngredientModal {
  setIsActive: Dispatch<SetStateAction<boolean>>
  isActive: boolean,
  ingredientId: string,
  setIngredients: Dispatch<SetStateAction<IIngredient[]>>
}

export const DeleteIngredientModal = ({
                                        setIngredients,
                                        ingredientId,
                                        setIsActive,
                                        isActive,
                                      }: IDeleteIngredientModal) => {


  const handleDeleteIngredient = async () => {
    try {
      const response = await IngredientsService.deleteIngredients(ingredientId);
      toast.success(response.message);
      setIsActive(false);
      setIngredients(prevState => {
        return prevState.filter(ingredient => ingredient._id !== ingredientId);
      });
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  };


  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col items-center space-y-6'>
        <p>Are you sure you want to remove this ingredient?</p>
        <div className='flex justify-around w-full'>
          <Button className='bg-emerald-700 hover:bg-emerald-600' onClick={handleDeleteIngredient}>
            Yes
          </Button>
          <Button className='bg-red-600 hover:bg-red-500' onClick={() => setIsActive(false)}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

