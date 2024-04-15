import { z } from 'zod';
import { isIsoDate } from '@/src/utils/isISODate';


export const createPromoCodeValidator = z.object({
  discountValue: z.number().positive().min(1).max(100),
  promoCode: z.string().min(3),
  expiresIn: z.string().refine(isIsoDate, { message: 'Invalid date format(should be ISO)' }).optional(),
});
