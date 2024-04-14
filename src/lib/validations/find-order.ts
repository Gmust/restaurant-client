import { z } from 'zod';


export const findOrderValidator = z.object({
  email: z.string().email(),
  orderNum: z.string().min(7).max(7),
});
