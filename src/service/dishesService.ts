import { IFetchDishesRequest, IFetchDishesResponse, IFetchSpecialtiesResponse } from '@/@types/dishes';


export class DishesService {

  static async fetchSpecialtiesMenu(): Promise<IFetchSpecialtiesResponse[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/specialties-menu`,
      { cache: 'no-cache' },
    );
    const specialtiesResponse = await response.json();
    return specialtiesResponse;
  }

  static async fetchDishes({ queryParams }: IFetchDishesRequest): Promise<IFetchDishesResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/dishes${queryParams ? `?${queryParams}` : ''}`,
    );
    const dishes = await response.json() as IFetchDishesResponse;
    return dishes;
  }

}
