import { cookies } from 'next/headers';

import { IUser } from '@/@types/user';


export async function GET(request: Request) {
  const authToken = cookies().get('accessToken')?.value;
  const headers = new Headers();

  headers.append('Authorization', `Bearer ${authToken!}`);
  headers.append('Content-Type', 'application/json');

  const data = JSON.stringify({ access_token: authToken });

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-by-token`, {
    cache: 'no-store',
    headers: headers,
    method: 'POST',
    body: data,
  });

  if (response.status === 401 || response.status === 403) {
    if (cookies().get('refreshToken')?.value && cookies().get('email')?.value) {
      const refreshPayload = {
        'refresh_token': cookies().get('refreshToken')?.value,
        'email': cookies().get('email')?.value,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshPayload),
      });
      const responseData = await res.json();

      cookies().set({
        name: 'accessToken',
        value: responseData.access_token,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
      cookies().set({
        name: 'refreshToken',
        value: responseData.refresh_token,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
    }
  }
  const resData: { access_token: string | undefined, user: IUser } = {
    user: await response.json(),
    access_token: cookies().get('accessToken')?.value,
  };

  return new Response(JSON.stringify(resData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
