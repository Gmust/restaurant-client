import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { IModalProps } from '@/@types';
import { DishCategories, IDish } from '@/@types/dishes';
import { IIngredient } from '@/@types/ingredients';
import { IngredientsList } from '@/src/components/adminPanel/dishes/ingredientsList/IngredientsList';
import { Button } from '@/src/components/shared/Button';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { Modal } from '@/src/components/shared/Modal';
import { changeDishValidator } from '@/src/lib/validations/change-dish';
import { DishesService } from '@/src/service/dishesService';
import { useAdminDishesStore } from '@/src/store/admin-dishes-store';

interface IChangeDishModalProps extends IModalProps {
  dish: IDish;
  allIngredients: IIngredient[];
  dishes: IDish[];
}

type formData = z.infer<typeof changeDishValidator>

export const ChangeDishModal = ({
                                  dishes,
                                  dish,
                                  isActive,
                                  setIsActive,
                                  allIngredients,
                                }: IChangeDishModalProps) => {

  const [pickedIngredients, setPickedIngredients] = useState<IIngredient[]>(dish.ingredients);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const updateDish = useAdminDishesStore(state => state.actions.updateDish);
  const router = useRouter();
  const { register, reset, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(changeDishValidator),
    mode: 'all',
    defaultValues: {
      isVegan: dish.isVegan,
      isAvailable: dish.isAvailable,
    },
  });

  const onSubmit = async (formData: formData) => {
    if (!pickedIngredients) {
      return setError('name', { message: 'Provide ingredients' });
    }
    setIsLoading(true);
    try {
      const response = await DishesService.changeDishInfo({
        name: formData.name,
        _id: dish._id,
        category: formData.category as DishCategories,
        dishWeight: formData.dishWeight,
        description: formData.description,
        ingredients: pickedIngredients,
        isAvailable: formData.isAvailable,
        isVegan: formData.isVegan,
        price: formData.price,
        preparationTime: formData.preparationTime?.toString(),
      });
      if (response._id) {
        updateDish(response)
        //handleUpdateDish(response);
        toast.success('Dish successfully updated');
        setIsActive(false)
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast('Something went wrong');
    }finally {
      setIsLoading(false)
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex space-x-2 divide-x-2'>
        <form className='flex justify-between flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex space-x-4'>
            <div className='flex flex-col space-y-6 '>
              <Image alt={dish.name} src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} width={400}
                     height={400} className='rounded-md' />
              <div className='space-y-2'>
                <div>
                  <label htmlFor='dish-name'>Dish name:</label>
                  <CustomInput id='dish-name' {...register('name')} variant='rounded' defaultValue={dish.name} />
                  <p className='text-red-700 font-semibold'>{errors.name && errors.name.message}</p>
                </div>
                <div>
                  <label htmlFor='dish-category'>Category:</label>
                  <select id='dish-category' title='Dish category'
                          defaultValue={dish.category} {...register('category')}
                          className='text-xl block py-1 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    {Object.values(DishCategories).filter(category => category != DishCategories.All).map(dishOption =>
                      <option value={dishOption} key={dishOption}
                      >
                        {dishOption}
                      </option>,
                    )}
                  </select>
                  <p className='text-red-700 font-semibold'>{errors.category && errors.category.message}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div>
                <label htmlFor='description'>Description:</label>
                <textarea id='description' {...register('description')} defaultValue={dish.description} rows={4}
                          className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                <p className='text-red-700 font-semibold'>{errors.description && errors.description.message}</p>
              </div>
              <div>
                <label htmlFor='dish-weight'>Dish weight:</label>
                <CustomInput {...register('dishWeight', { valueAsNumber: true })} variant='rounded'
                             defaultValue={dish.dishWeight}
                             id='dish-weight' type='number' />
                <p className='text-red-700 font-semibold'>{errors.dishWeight && errors.dishWeight.message}</p>
              </div>
              <div>
                <label htmlFor='price'>Dish price:</label>
                <CustomInput {...register('price', { valueAsNumber: true })} variant='rounded' defaultValue={dish.price}
                             id='price'
                             type='number' />
                <p className='text-red-700 font-semibold'>{errors.price && errors.price.message}</p>
              </div>
              <div>
                <label htmlFor='preparation-time'>Preparation time:</label>
                <CustomInput id='preparation-time' {...register('preparationTime', { valueAsNumber: true })}
                             variant='rounded'
                             defaultValue={dish.preparationTime} type='number' />
                <p className='text-red-700 font-semibold'>{errors.preparationTime && errors.preparationTime.message}</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              <div className='flex items-center space-x-2'>
                <label htmlFor='is-vegan'>Is available:</label>
                <CustomInput id='is-available' {...register('isAvailable')}
                             className='w-5 h-5 border-2 border-amber-500  rounded-sm accent-amber-600  cursor-pointer'
                             variant='rounded' type='checkbox' />
              </div>
              <p className='text-red-700 font-semibold'>{errors.isAvailable && errors.isAvailable.message}</p>
            </div>
            <div>
              <div className='flex items-center space-x-2'>
                <label htmlFor='is-vegan'>Is for vegans:</label>
                <CustomInput id='is-vegan' {...register('isVegan')}
                             className='w-5 h-5 border-2 border-amber-500  rounded-sm accent-amber-600  cursor-pointer'
                             variant='rounded' type='checkbox' />
              </div>
              <p className='text-red-700 font-semibold'>{errors.isVegan && errors.isVegan.message}</p>
            </div>
          </div>
          <Button className='mt-2' type='submit' isLoading={isLoading}>Update</Button>
        </form>
        <IngredientsList allIngredients={allIngredients} setPickedIngredients={setPickedIngredients}
                         pickedIngredients={pickedIngredients} />
      </div>
    </Modal>
  );
};

