import { z } from 'zod';
import { Units } from '@/@types/ingredients';


export const createIngredientValidator = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  unit: z.nativeEnum(Units),
});
