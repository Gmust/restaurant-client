import { z } from 'zod';


export const createOrderValidator = z.object({
  email: z.string().email(),
  promoCode: z.string().optional(),
});
