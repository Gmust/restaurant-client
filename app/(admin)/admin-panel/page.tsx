import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { AuthService } from '@/src/service/authService';

const AdminPanelPage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    redirect('/');
  }
  const user = await AuthService.getUserByToken(token);
  if (!user) {
    redirect('/');
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <p className='mt-10 text-black text-3xl font-semibold'>Welcome {user?.role} {user?.firstName}</p>
      <p className='mt-10 text-black text-2xl '>Select category to proceed work</p>
    </div>
  );
};


export default AdminPanelPage;
