import { AuthService } from '@/src/service/authService';
import { cookies } from 'next/headers';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/src/components/shared/Button';
import { UserInfo } from '@/src/components/userPage/UserInfo';
import { UserOrders } from '@/src/components/userPage/UserOrders';
import { Frown } from 'lucide-react';
import { ReceiveNews } from '@/src/components/userPage/ReceiveNews';
import { OrdersService } from '@/src/service/ordersService';
import { ReviewsService } from '@/src/service/reviewsService';
import { ReviewCard } from '@/src/components/reviews/ReviewCard';
import { LeaveFeedback } from '@/src/components/shared/LeaveFeedback';
import { IReview } from '@/@types/reviews';
import { ChangeReviewModal } from '@/src/components/reviews/ChangeReviewModal';
import { ChangeFeedback } from '@/src/components/shared/ChangeFeedback';

const UserPage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    redirect('/');
  }
  const user = await AuthService.getUserByToken(token);
  if (!user) {
    redirect('/');
  }

  const userOrders = await OrdersService.getUserOrders(user._id, token);
  const userReview = await ReviewsService.getUserReview(user.review);
  return (
    <>
      {user ?
        <div className='flex space-x-10 items-center justify-between mx-16 text-2xl'>
          <div>
            <UserInfo {...user} />
            <ReceiveNews userId={user._id} receiveNews={user.receiveNews} />
            <div className='mt-10'>
              {
                userReview ?
                  <div className='flex flex-col space-y-3'>
                    <p>Your review:</p>
                    <ReviewCard {...userReview!} />
                    <ChangeFeedback review={userReview} />
                  </div>
                  :
                  <div className='flex flex-col space-y-2 '>
                    <p>Please leave your feedback about our place to make it better!</p>
                    <LeaveFeedback />
                  </div>
              }
            </div>
          </div>
          <div className='space-y-6'>
            <div>
              <p className='font-semibold'>Current orders:</p>
              {
                userOrders && userOrders.length > 0 ?
                  <UserOrders orders={userOrders} />
                  :
                  <span className='flex space-x-2 items-start'>
                    <p>It is empty here...</p>
                    <Frown size={40} />
                  </span>
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
