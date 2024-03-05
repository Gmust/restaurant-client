import { cookies } from 'next/headers';
import { json } from 'node:stream/consumers';


export async function GET(request: Request) {
  const authToken = cookies().get('accessToken')?.value;
  const headers = new Headers();

  headers.append('Authorization', authToken!);
  headers.append('Content-Type', 'application/json');

  const data = JSON.stringify({ access_token: authToken });

  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/auth/user-by-token`, {
    headers: headers,
    method: 'POST',
    body: data,
  });

  if (response.status === 401 || response.status === 403) {
    const refreshPayload = {
      'refresh_token': cookies().get('refreshToken')?.value,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/auth/refresh`, {
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

  const resData = {
    access_token: cookies().get('accessToken')?.value,
  };

  return new Response(JSON.stringify(resData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
