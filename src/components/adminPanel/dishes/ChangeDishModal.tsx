import { IModalProps } from '@/@types';
import { DishCategories, IDish } from '@/@types/dishes';
import { Modal } from '@/src/components/shared/Modal';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeDishValidator } from '@/src/lib/validations/change-dish';
import { z } from 'zod';
import { CustomInput } from '@/src/components/shared/CustomInput';

interface IChangeDishModalProps extends IModalProps {
  dish: IDish;
}

type formData = z.infer<typeof changeDishValidator>

export const ChangeDishModal = ({ dish, isActive, setIsActive }: IChangeDishModalProps) => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(changeDishValidator),
  });

  const onSubmit = (formData: formData) => {
    try {

    } catch (e) {

    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <form className='flex justify-between' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col space-y-2'>
          <Image alt={dish.name} src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/${dish.image}`} width={400}
                 height={400} className='rounded-md' />
          <div>
            <CustomInput {...register('name')} variant='rounded' defaultValue={dish.name} />
          </div>
          <select id='dish-category' title='Dish category' value={dish.category} {...register('category')}
                  className='block py-1 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            {Object.values(DishCategories).map(dishOption =>
              <option value={dishOption} key={dishOption}
              >
                {dishOption}
              </option>,
            )}
          </select>
        </div>
        <div className='flex flex-col'>
          <CustomInput {...register('description')} variant='rounded' defaultValue={dish.description}/>
          <CustomInput {...register('dishWeight')}  variant='rounded' defaultValue={dish.dishWeight}/>
          <CustomInput {...register('price')} variant='rounded' defaultValue={dish.price}/>
          <CustomInput {...register('preparationTime')} variant='rounded' defaultValue={dish.preparationTime}/>
        </div>
      </form>
    </Modal>
  );
};

