import { AuthService } from '@/src/service/authService';
import { cookies } from 'next/headers';
import { permanentRedirect, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/src/components/shared/Button';
import { UserInfo } from '@/src/components/userPage/UserInfo';
import { UserOrders } from '@/src/components/userPage/UserOrders';
import { Frown } from 'lucide-react';
import { ReceiveNews } from '@/src/components/userPage/ReceiveNews';

const UserPage = async () => {
  const token = cookies().get('accessToken')?.value;

  if (!token) {
    permanentRedirect('/');
  }

  const user = await AuthService.getUserByToken(token);

  return (
    <>
      {user ?
        <div className='flex justify-around mx-16 text-2xl'>
          <div>
            <UserInfo {...user} />
            <ReceiveNews receiveNews={user.receiveNews} />
          </div>
          <div className='space-y-6'>
            <div>
              <p className='font-semibold'>Current orders:</p>
              {
                user.orders.length > 0 ?
                  <UserOrders orders={user.orders} />
                  :
                  <span className='flex space-x-2 items-start'>
                    <p>It is empty here...</p>
                    <Frown size={40} />
                  </span>
              }
            </div>
            <div>
              {
                user.review ?
                  <div className='flex flex-col'>
                    <p>Your review:</p>
                    <div>
                      {user.review}
                    </div>
                  </div>
                  :
                  <div className='flex flex-col space-y-2 '>
                    <p>Please leave your feedback about our place to make it better!</p>
                    <Link href='/review' className='w-full'>
                      <Button>Leave feedback</Button>
                    </Link>
                  </div>
              }
            </div>
          </div>
        </div>
        :
        <div className='flex flex-col justify-center items-center h-4/5'>
          <p className='text-2xl font-semibold'>Something went wrong reload the page or try later</p>
          <Link href='/user/account-info' prefetch={true}>
            <Button>Reload page</Button>
          </Link>
        </div>
      }
    </>
  );
};

export default UserPage;
