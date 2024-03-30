import { $authHost } from '@/src/service/index';
import { IIngredient } from '@/@types/ingredients';
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

      return await response.json() as IIngredient[];
    } catch (e) {
      console.error('Error fetching all ingredients:', e);
    }
  }


}
