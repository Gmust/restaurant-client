import { z } from 'zod';


export const createBookingValidator = z.object({
  email: z.string().email(),
  amountOfVisitors: z.any(),
});
