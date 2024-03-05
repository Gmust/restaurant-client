import { z } from 'zod';
import { createAccountValidator } from '@/src/lib/validations/create-account';
import { IConfirmAccount, ILoginResponse, IUserLoginReq, IUserLoginRes } from '@/@types/auth';


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

  static async confirmAccount({ token, email }: IConfirmAccount) {
    try {
      const data = JSON.stringify({ confirmationToken: token, email });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/auth/confirm-account`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      });

      return await response.json();
    } catch (e) {
      console.error('FAiled to confirm account');
      console.error(e);
    }
  }

  static async loginUser({ email, password }: IUserLoginReq) {
    try {

      const data = JSON.stringify({ email, password });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });


      return await response.json() as IUserLoginRes;
    } catch (e) {
      console.error('Failed to login user');
      console.error(e);
    }
  }

}
