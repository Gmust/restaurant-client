import { Dispatch, SetStateAction, useState } from 'react';
import { IIngredient, Units } from '@/@types/ingredients';
import { z } from 'zod';
import { updateIngredientValidator } from '@/src/lib/validations/update-ingredient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { IngredientsService } from '@/src/service/ingredientsService';
import { Modal } from '@/src/components/shared/Modal';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { Button } from '@/src/components/shared/Button';


interface IUpdateIngredientsModal {
  setIngredients: Dispatch<SetStateAction<IIngredient[]>>;
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean,
  ingredient: IIngredient,
  ingredients: IIngredient[]
}

type formData = z.infer<typeof updateIngredientValidator>

export const UpdateIngredientsModal = ({
                                         setIsActive,
                                         isActive,
                                         setIngredients,
                                         ingredients,
                                         ingredient,
                                       }: IUpdateIngredientsModal) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<formData>({
    resolver: zodResolver(updateIngredientValidator),
    defaultValues: {
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    },
  });

  const handleUpdateIngredients = (updatedIngredient: IIngredient) => {
    const index = ingredients.findIndex((d) => d._id === updatedIngredient._id);
    if (index !== -1) {
      const updatedDishes = [...ingredients];
      updatedDishes[index] = updatedIngredient;
      setIngredients(updatedDishes);
    }
  };

  const onSubmit = async (formData: formData) => {
    setIsLoading(true);
    try {
      const response = await IngredientsService.updateIngredient({
        _id: ingredient._id,
        unit: formData.unit!,
        name: formData.name!,
        quantity: formData.quantity!,
      });
      handleUpdateIngredients(response);
      toast.success('Ingredient successfully updated');
      reset();
      setIsActive(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('Something went wrong...');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>Update ingredient</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor='name'>Name:</label>
            <CustomInput id='name' {...register('name')} variant='rounded' placeholder='Garlick...' />
            <p className='text-red-700 font-semibold'>{errors.name && errors.name.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='quantity'>Quantity:</label>
            <CustomInput id='quantity' {...register('quantity', { valueAsNumber: true })} variant='rounded'
                         placeholder='100...' type='number' />
            <p className='text-red-700 font-semibold'>{errors.quantity && errors.quantity.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='unit'>Unit</label>
            <select id='unit' title='Unit' {...register('unit')} className='text-xl block py-1 w-full text-gray-900
            bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1'>
              {Object.values(Units).map(unit =>
                <option value={unit} key={unit}
                >
                  {unit}
                </option>,
              )}
            </select>
            <p className='text-red-700 font-semibold'>{errors.unit && errors.unit.message}</p>
          </div>
          <Button type='submit' isLoading={isLoading}>
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
};

