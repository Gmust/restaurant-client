import { z } from 'zod';
import { Units } from '@/@types/ingredients';
import { Roles } from '@/@types/user';

export const notifyUserValidator = z.object({
  role: z.nativeEnum(Roles),
  subject: z.string().min(2),
  message: z.string().min(10),
});
