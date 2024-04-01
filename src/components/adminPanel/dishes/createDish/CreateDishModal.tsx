import { Dispatch, SetStateAction, useState } from 'react';
import { IIngredient } from '@/@types/ingredients';
import { Modal } from '@/src/components/shared/Modal';
import { z } from 'zod';
import { createDishValidator } from '@/src/lib/validations/create-dish';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { DishCategories, IDish } from '@/@types/dishes';
import { Button } from '@/src/components/shared/Button';
import { IngredientsList } from '@/src/components/adminPanel/dishes/ingredientsList/IngredientsList';
import toast from 'react-hot-toast';
import { DishesService } from '@/src/service/dishesService';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAdminDishesStore } from '@/src/store/admin-dishes-store';


interface ICreateDishModal {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  allIngredients: IIngredient[]
}

type formData = z.infer<typeof createDishValidator>

export const CreateDishModal = ({ setIsActive, isActive, allIngredients }: ICreateDishModal) => {


  const [pickedIngredients, setPickedIngredients] = useState<IIngredient[]>([]);
  const [dishPicture, setDishPicture] = useState<File>();
  const createDish = useAdminDishesStore(state => state.actions.createDish);
  const [previewDishPicture, setPreviewDishPicture] = useState<string>('/image-placeholder.png');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(createDishValidator), mode: 'all' });


  const handleUploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setDishPicture(selectedFiles?.[0]);
    setPreviewDishPicture(URL.createObjectURL(selectedFiles?.[0]));
  };

  const onSubmit = async (formData: formData) => {
    if (pickedIngredients.length < 1) {
      toast.error('Add ingredients!');
      return;
    }
    if (!dishPicture) {
      toast.error('Add picture!');
      return;
    }

    const ingredientsIds = pickedIngredients.map(ingredient => ingredient._id);

    const newDish = new FormData();
    newDish.append('name', formData.name);
    newDish.append('dishWeight', formData.dishWeight.toString());
    newDish.append('price', formData.price.toString());
    newDish.append('ingredients', JSON.stringify(ingredientsIds));
    newDish.append('isVegan', formData.isVegan.toString());
    newDish.append('category', formData.category);
    newDish.append('preparationTime', formData.preparationTime.toString());
    newDish.append('image', dishPicture!);
    newDish.append('description', formData.description);
    try {
      const response = await DishesService.createDish(newDish);
      toast.success(response.message);
      setIsActive(false);
      createDish(response.dish);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e?.response?.data.message);
      } else {
        console.error(e);
        toast.error('Something went wrong...');
      }
    }
  };


  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex space-x-2 divide-x-2'>
        <form className='flex justify-between flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex space-x-4'>
            <div className='flex flex-col space-y-6 '>
              <div className='flex flex-col items-center'>
                <Image src={previewDishPicture} alt='placeholder' width={200}
                       height={200} draggable={false} />
                <div className='flex items-center justify-center w-full mt-5' draggable={false}>
                  <label htmlFor='image'
                         className='flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' aria-hidden='true'
                           xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
                        <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2' />
                      </svg>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'><span className='font-semibold'>Click to upload</span> or
                        drag and drop</p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, JPEG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id='image' type='file' accept='image/*' {...register('image')} className='hidden'
                           onChange={handleUploadPicture}
                    />
                  </label>
                </div>
                <p className='text-red-700 font-semibold'>
                  {
                    errors.image && errors.image.message?.toString()
                  }
                </p>
              </div>
              <div className='space-y-2'>
                <div>
                  <label htmlFor='dish-name'>Dish name:</label>
                  <CustomInput id='dish-name' {...register('name')} variant='rounded' />
                  <p className='text-red-700 font-semibold'>{errors.name && errors.name.message}</p>
                </div>
                <div>
                  <label htmlFor='dish-category'>Category:</label>
                  <select id='dish-category' title='Dish category'{...register('category')}
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
                <textarea id='description' {...register('description')} rows={4}
                          className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                <p className='text-red-700 font-semibold'>{errors.description && errors.description.message}</p>
              </div>
              <div>
                <label htmlFor='dish-weight'>Dish weight:</label>
                <CustomInput {...register('dishWeight', { valueAsNumber: true })} variant='rounded'

                             id='dish-weight' type='number' />
                <p className='text-red-700 font-semibold'>{errors.dishWeight && errors.dishWeight.message}</p>
              </div>
              <div>
                <label htmlFor='price'>Dish price:</label>
                <CustomInput {...register('price', { valueAsNumber: true })} variant='rounded'
                             id='price'
                             type='number' />
                <p className='text-red-700 font-semibold'>{errors.price && errors.price.message}</p>
              </div>
              <div>
                <label htmlFor='preparation-time'>Preparation time:</label>
                <CustomInput id='preparation-time' {...register('preparationTime', { valueAsNumber: true })}
                             variant='rounded' type='number' />
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
          <Button className='mt-2' type='submit'>Create</Button>
        </form>
        <IngredientsList allIngredients={allIngredients} setPickedIngredients={setPickedIngredients}
                         pickedIngredients={pickedIngredients}  />
      </div>
    </Modal>
  );
};

