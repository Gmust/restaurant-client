import { z } from 'zod';

import { Units } from '@/@types/ingredients';


export const updateIngredientValidator = z.object({
  name: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.nativeEnum(Units).optional(),
});
