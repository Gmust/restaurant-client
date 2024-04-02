import { $authHost } from '@/src/service/index';
import { ICreateIngredientRes, IIngredient } from '@/@types/ingredients';
import { IDish } from '@/@types/dishes';
import { AuthService } from '@/src/service/authService';
import { cookies } from 'next/headers';
import { storeToken } from '@/src/lib/store-token';


export class IngredientsService {

  static async getAllIngredients(token: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/ingredients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        throw new Error('Unauthorized');
      }

      return await response.json() as IIngredient[];
    } catch (e) {
      console.error('Error fetching all ingredients:', e);
    }
  }

  static async createIngredient({ quantity, unit, name }: Omit<IIngredient, '_id'>) {
    try {
      const response = await $authHost.post<ICreateIngredientRes>('/ingredients', {
        name,
        quantity,
        unit,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to create ingredient', e);
      throw e;
    }
  }

  static async deleteIngredients(ingredientId: string) {
    try {
      const response = await $authHost.delete(`/ingredients/${ingredientId}`);

      return response.data;
    } catch (e) {
      console.error('Failed to delete ingredient', e);
      throw e;
    }
  }

  static async updateIngredient({ quantity, name, unit, _id }: IIngredient) {
    try {
      const response = await $authHost.patch('/ingredients', {
        _id,
        name,
        quantity,
        unit,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to update ingredient', e);
      throw e;
    }
  }
}
