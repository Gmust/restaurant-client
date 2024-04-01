import { DishesService } from '@/src/service/dishesService';
import toast from 'react-hot-toast';
import { Modal } from '@/src/components/shared/Modal';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/src/components/shared/Button';
import { useRouter } from 'next/navigation';
import { IDish } from '@/@types/dishes';
import { useAdminDishesStore } from '@/src/store/admin-dishes-store';


interface IDeleteDishModalProps {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  dishId: string,
  setDishes: Dispatch<SetStateAction<IDish[]>>
}

export const DeleteDishModal = ({ dishId, isActive, setIsActive, setDishes }: IDeleteDishModalProps) => {

  const router = useRouter();
  const deleteDish = useAdminDishesStore(state => state.actions.deleteDish);

  const handleDeleteDish = async () => {
    try {
      const response = await DishesService.deleteDish(dishId);
      toast.success(response.message);
      setIsActive(false);
      deleteDish(dishId);
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col items-center space-y-6'>
        <p>Are you sure you want to remove this dish?</p>
        <div className='flex justify-around w-full'>
          <Button className='bg-emerald-700 hover:bg-emerald-600' onClick={handleDeleteDish} >
            Yes
          </Button>
          <Button className='bg-red-600 hover:bg-red-500' onClick={() => setIsActive(false)}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

