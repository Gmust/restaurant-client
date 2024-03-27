import { Button } from '@/src/components/shared/Button';
import { DishesService } from '@/src/service/dishesService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { DishesList } from '@/src/components/adminPanel/dishes/DishesList';
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
          <div className='flex justify-between w-full'>
            <DishesList allIngredients={allIngredients} initialDishes={allDishes} />
            {/*<div>*/}
            {/*  <div>*/}
            {/*    <p>Total amount of dishes: {allDishes.length}</p>*/}
            {/*  </div>*/}
            {/*  <Button>Create new dish</Button>*/}
            {/*</div>*/}
          </div>
          :
          <div></div>
      }

    </section>
  );
};

export default DishesPage;
