import { AuthService } from '@/src/service/authService';
import { cookies } from 'next/headers';

const UserPage = async () => {
  const token = cookies().get('accessToken')?.value;
  const response = await AuthService.getUserByToken(token!);
  return (
    <div className=''>
    </div>
  );
};

export default UserPage;
