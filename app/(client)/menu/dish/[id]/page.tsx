import { DishInfo } from '@/src/components/dish/DishInfo';
import { DishesService } from '@/src/service/dishesService';

const DishPage = async ({ params }: { params: { id: string }, }) => {

  const dish = await DishesService.fetchDish(params.id);


  return (
    <div>
      <DishInfo {...dish} />
    </div>
  );
};


export default DishPage;
