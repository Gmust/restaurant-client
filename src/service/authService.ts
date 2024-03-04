import { z } from 'zod';
import { createAccountValidator } from '@/src/lib/validations/create-account';
import { ILoginResponse } from '@/@types/auth';


export class AuthService {

  static async registerUser(userInfo: z.infer<typeof createAccountValidator>) {
    try {
      const data = JSON.stringify(userInfo);
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/auth/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      });
      return await response.json() as ILoginResponse;
    } catch (e) {
      console.error('Failed to create user');
      console.error(e);
    }
  }


}
