import { IDish, IFetchDishesRequest, IFetchDishesResponse, IFetchSpecialtiesResponse } from '@/@types/dishes';


export class DishesService {

  static async fetchSpecialtiesMenu(): Promise<IFetchSpecialtiesResponse[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/specialties-menu`,
        { cache: 'no-cache' },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch specialties menu');
      }

      return await response.json();
    } catch (e) {
      console.error('Error fetching specialties menu:', e);
      throw new Error('Failed to fetch specialties menu. Please try again later.');
    }
  }

  static async fetchDishes({ queryParams }: IFetchDishesRequest): Promise<IFetchDishesResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes${queryParams ? `?${queryParams}` : ''}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch dishes menu');
      }

      return await response.json() as IFetchDishesResponse;
    } catch (e) {
      console.error('Error fetching dishes menu:', e);
      throw new Error('Failed to fetch dishes menu. Please try again later.');
    }
  }

  static async fetchDish(id: string): Promise<IDish> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/dish/${id}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch  dish info');
      }

      return await response.json() as IDish;
    } catch (e) {
      console.error('Error fetching dishes menu:', e);
      throw new Error('Failed to fetch dishes menu. Please try again later.');
    }
  }
}
