import { Dispatch, SetStateAction, useState } from 'react';
import { z } from 'zod';
import { createIngredientValidator } from '@/src/lib/validations/create-ingredient';
import { Modal } from '@/src/components/shared/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { DishCategories } from '@/@types/dishes';
import { IIngredient, Units } from '@/@types/ingredients';
import { Button } from '@/src/components/shared/Button';
import { IngredientsService } from '@/src/service/ingredientsService';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ICreateIngredientModal {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  setIngredients: Dispatch<SetStateAction<IIngredient[]>>,
  ingredients: IIngredient[]
}

type formData = z.infer<typeof createIngredientValidator>

export const CreateIngredientModal = ({
                                        isActive,
                                        setIsActive,
                                        setIngredients,
                                        ingredients,
                                      }: ICreateIngredientModal) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, reset, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(createIngredientValidator),
    mode: 'all',
  });

  const onSubmit = async ({ unit, quantity, name }: formData) => {
    setIsLoading(true);
    try {
      const response = await IngredientsService.createIngredient({ name, quantity, unit });
      toast.success(response.message);
      setIngredients(prevState => [...prevState, response.ingredient])
      setIsActive(false);
      reset();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>New ingredient:</h1>
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
            Create
          </Button>
        </form>
      </div>
    </Modal>
  );
};

