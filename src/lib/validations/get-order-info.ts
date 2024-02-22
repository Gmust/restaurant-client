import { z } from 'zod';


export const getOrderInfoValidator = z.object({
  email: z.string().email(),
  orderNumber: z.string(),
});
