import {
  IChangeDishInfoReq, ICreateDishResponse, ICreateSpecialtiesMenu,
  IDish,
  IFetchDishesRequest,
  IFetchDishesResponse,
  IFetchSpecialtiesResponse,
} from '@/@types/dishes';
import { IPayForOrderRes } from '@/@types/orders';
import { $authHost, $unAuthHost } from '@/src/service/index';
import { OrdersService } from '@/src/service/ordersService';


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


  static async getAllDishes(token: string) {
    try {
      const response = await $unAuthHost.get<IDish[]>('dishes/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      console.error('Error fetching dishes menu:', e);
      throw e;
    }
  }

  static async changeDishInfo(updatedDish: IChangeDishInfoReq) {
    try {
      const response = await $authHost.patch<IDish>('/dishes', updatedDish);

      return response.data;
    } catch (e) {
      console.error('Error changing dish info', e);
      throw new Error('Error changing dish info', { cause: e });
    }
  }

  static async createDish(formData: any) {
    try {
      const response = await $authHost.post<ICreateDishResponse>('/dishes', formData);

      return response.data;
    } catch (e) {
      console.error('Error creating dish:', e);
      throw e;
    }
  }

  static async deleteDish(dishId: string) {
    try {
      const response = await $authHost.delete<{ message: string }>(`/dishes/${dishId}`);

      return response.data;
    } catch (e) {
      console.error('Error deleting dish:', e);
      throw e;
    }
  }

  static async getDishesByTerm(term: string) {
    try {
      const response = await $authHost.get(`/dishes/find?term=${term}`);
      return response.data;
    } catch (e) {
      console.error('Error finding dish by term', e);
      throw e;
    }
  }

  static async createSpecialtiesMenu({ specialties }: ICreateSpecialtiesMenu) {
    try {
      const response = await $authHost.post('/dishes/create-specialties-menu', {
        specialties,
      });

      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
