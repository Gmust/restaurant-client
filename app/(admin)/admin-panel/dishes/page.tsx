import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { CreateDishButton } from '@/src/components/adminPanel/dishes/createDish/CreateDishButton';
import { DishesList } from '@/src/components/adminPanel/dishes/DishesList';
import { DishesService } from '@/src/service/dishesService';
import { IngredientsService } from '@/src/service/ingredientsService';

const DishesPage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }
  const allDishes = await DishesService.getAllDishes(token);
  const allIngredients = await IngredientsService.getAllIngredients(token);

  return (
    <section className='w-full text-black text-2xl px-4 py-6'>
      {
        allDishes && allDishes.length > 0 ?
          <div className='flex justify-between w-full space-x-4'>
            <DishesList allIngredients={allIngredients!} initialDishes={allDishes} />
            <CreateDishButton allDishes={allDishes} allIngredients={allIngredients!} />
          </div>
          :
          <div></div>
      }
    </section>
  );
};

export default DishesPage;
