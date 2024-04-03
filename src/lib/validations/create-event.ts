import { z } from 'zod';


export const createEventValidator = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  startDate: z.string()
    .min(1, { message: 'mandatory' })
    .transform((v) => v.split('-').reverse().join('-'))
    .transform((v) => `${v}T00:00:00.000Z`)
    .pipe(
      z
        .string()
        .datetime({ message: 'incorrect format' }),
    ).optional(),
  endDate: z.string()
    .min(1, { message: 'mandatory' })
    .transform((v) => v.split('-').reverse().join('-'))
    .transform((v) => `${v}T00:00:00.000Z`)
    .pipe(
      z
        .string()
        .datetime({ message: 'incorrect format' }),
    ).optional()
});
