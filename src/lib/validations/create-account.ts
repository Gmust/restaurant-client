import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const createAccountValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(passwordValidation, {
    message: 'Your password must contain: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  }),
  confirmPassword: z.string().min(8, 'Password must be at least 8 symbols'),
  firstName: z.string().min(1, { message: 'First name can`t be empty' }),
  secondName: z.string().min(1, { message: 'First name can`t be empty' }),
  receiveNews: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match',
});
