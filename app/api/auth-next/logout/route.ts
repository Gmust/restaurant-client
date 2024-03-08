import { cookies } from 'next/headers';

export async function DELETE(request: Request) {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  cookies().delete('email');
  return Response.json({ success: true });
}
