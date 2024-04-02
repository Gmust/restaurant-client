import { IngredientsService } from '@/src/service/ingredientsService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { IngredientsList } from '@/src/components/adminPanel/ingredients/IngredientsList';

const IngredientsPage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    notFound();
  }

  const allIngredients = await IngredientsService.getAllIngredients(token);


  return (
    <div>
      {
        allIngredients  ?
            <IngredientsList ingredients={allIngredients} />
          :
          <div>Error....s</div>
      }
    </div>
  );
};

export default IngredientsPage;
