import { z } from 'zod';

import { DishCategories, IDish } from '@/@types/dishes';
import { IIngredient } from '@/@types/ingredients';

const categoryEnum = Object.values(DishCategories).filter((v) => isNaN(Number(v))) as [string, ...string[]];
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const createDishValidator = z.object({
  name: z.string({}).min(1),
  description: z.string().min(1),
  isVegan: z.boolean(),
  price: z.number(),
  preparationTime: z.number(),
  category: z.enum(categoryEnum),
  isAvailable: z.boolean(),
  dishWeight: z.number(),
  image: z
    .any()
});

