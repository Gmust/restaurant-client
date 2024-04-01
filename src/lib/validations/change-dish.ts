import { z } from 'zod';
import { IIngredient } from '@/@types/ingredients';
import { DishCategories } from '@/@types/dishes';

const categoryEnum = Object.values(DishCategories).filter((v) => isNaN(Number(v))) as  [string, ...string[]];

export const changeDishValidator = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isVegan: z.boolean().optional(),
  price: z.number().optional(),
  preparationTime: z.number().optional(),
  category: z.enum(categoryEnum).optional(),
  isAvailable: z.boolean().optional(),
  dishWeight: z.number().optional(),
});

