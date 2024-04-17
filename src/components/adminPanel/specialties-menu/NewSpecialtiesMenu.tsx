'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { IDish } from '@/@types/dishes';
import { DishItemsContainer } from '@/src/components/adminPanel/specialties-menu/DishItemsContainer';
import { Button } from '@/src/components/shared/Button';
import { DishesService } from '@/src/service/dishesService';

interface INewSpecialtiesMenu {
  dishes: IDish[];
}


export const NewSpecialtiesMenu = ({ dishes: initialDishes }: INewSpecialtiesMenu) => {

  const [dishes, setDishes] = useState<IDish[]>(initialDishes);
  const [pickedDishes, setPickedDishes] = useState<IDish[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setDishes(initialDishes)
  }, [initialDishes]);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdatePickedList = (id: string) => {
    let dishesFromList = dishes.find(item => item._id == id);
    if (dishesFromList && !pickedDishes.find(item => item._id == id)) {
      const newIngredientsList = dishes.filter(item => item._id !== id);
      setDishes(newIngredientsList);
      setPickedDishes([...pickedDishes, dishesFromList]);
    }
  };

  const handleUpdateDishesList = (id: string) => {
    const dishesFromList = pickedDishes.find(item => item._id == id);
    if (dishesFromList && !dishes.find(item => item._id == id)) {
      const newIngredientsList = pickedDishes.filter(item => item._id !== id);
      setPickedDishes(newIngredientsList);
      setDishes([...dishes, dishesFromList]);
    }
  };

  const handleCreateNewMenu = async () => {
    setIsLoading(true);
    try {
      const response = await DishesService.createSpecialtiesMenu({ specialties: pickedDishes });
      if(response.specialtyDishes){
        toast.success('New menu successfully created!')
      }
      router.refresh();
      setPickedDishes([])
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between space-x-4'>
        <div className='flex flex-col w-full'>
          <h3 className='text-xl text-black'>Picked dishes:</h3>
          <div className='overflow-y-auto max-h-[480px]'>
            <DishItemsContainer dishes={pickedDishes} isDragging={isDragging} handleDragging={handleDragging}
                                handleUpdateList={handleUpdatePickedList} />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <h3 className='text-xl text-black'>All dishes:</h3>
          <div className=' overflow-y-auto max-h-[480px]'>
            <DishItemsContainer dishes={dishes} isDragging={isDragging} handleDragging={handleDragging}
                                handleUpdateList={handleUpdateDishesList} />
          </div>
        </div>
      </div>
      <Button disabled={pickedDishes.length <= 0 || isLoading} isLoading={isLoading} onClick={handleCreateNewMenu}>
        Create new menu
      </Button>
    </div>
  );
};

