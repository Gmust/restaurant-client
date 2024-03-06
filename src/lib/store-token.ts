'use server';

import { cookies } from 'next/headers';

interface StoreTokenRequest {
  access_token: string,
  refresh_token: string,
  email: string
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: 'accessToken',
    value: request.access_token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  cookies().set({
    name: 'refreshToken',
    value: request.refresh_token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  cookies().set({
    name: 'email',
    value: request.email,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

}
