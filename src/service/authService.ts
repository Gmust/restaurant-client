import { z } from 'zod';

import { IConfirmAccount, ILoginResponse, IRefreshTokenReq, IUserLoginReq, IUserLoginRes } from '@/@types/auth';
import { IUser } from '@/@types/user';
import { createAccountValidator } from '@/src/lib/validations/create-account';
import { $authHost } from '@/src/service/index';


export class AuthService {

  static async registerUser(userInfo: z.infer<typeof createAccountValidator>) {
    try {
      const data = JSON.stringify(userInfo);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      });
      return await response.json() as ILoginResponse;
    } catch (e) {
      console.error('Failed to create user', e);
    }
  }

  static async getUserWithToken() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth-next/token`, { method: 'GET' });
      const resData = await res.json();
      return resData as { access_token: string, user: IUser };
    } catch (e) {
      console.error('Failed to receive user with token');
    }
  }

  static async confirmAccount({ token, email }: IConfirmAccount) {
    try {
      const data = JSON.stringify({ confirmationToken: token, email });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/confirm-account`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      });

      return await response.json();
    } catch (e) {
      console.error('FAiled to confirm account-info');
      console.error(e);
    }
  }

  static async loginUser({ email, password }: IUserLoginReq) {
    try {
      const data = JSON.stringify({ email, password });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });


      return await response.json() as IUserLoginRes;
    } catch (e) {
      throw e;
    }
  }

  static async checkIsAuth() {
    try {
      const nextRes = await fetch('/api/auth-next/token');
      if (nextRes.status !== 200) {
        return;
      } else if (nextRes.status == 200) {
        return await nextRes.json();
      }
    } catch (e) {
      console.error('Failed to check user auth');
      console.error(e);
    }
  }

  static async getUserByToken(access_token: string) {
    try {
      const data = JSON.stringify({ access_token });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-by-token`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      return await response.json() as IUser;
    } catch (e) {
      console.error('Error fetching user:', e);
    }
  }
  // static async getUserByToken(access_token: string) {
  //   try {
  //     const response = await $authHost.post<IUser>('auth/user-by-token', {
  //       access_token,
  //     });
  //     return response.data;
  //   } catch (e) {
  //     //console.error('Error fetching user:', e);
  //   }
  // }
}
