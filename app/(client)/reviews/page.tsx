import { Metadata } from 'next';

import { ReviewsList } from '@/src/components/reviews/ReviewsList';
import { ReviewsService } from '@/src/service/reviewsService';


export const metadata: Metadata = {
  title: 'User reviews',
  description: 'Reviews of our best in the world customers',
};

const ReviewsPage = async () => {

  const reviews = await ReviewsService.getAllReviews({ oldFirst: false, newFirst: true, limit: 10, skip: 0 });

  return (
    <div className='flex flex-col justify-center items-center space-y-6'>
      <h2 className='text-2xl font-semibold'>
        Our clients reviews:
      </h2>
      {
        reviews && reviews.data ?
          <ReviewsList {...reviews} />
          : <div></div>
      }
    </div>
  );
};

export default ReviewsPage;
