import { IReview } from '@/@types/reviews';
import { Divide, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ReviewCard = ({ reviewComment, user, rating }: IReview) => {
  return (
    <div className='min-w-96 flex flex-col border-2 rounded-md border-gray-300 p-2 divide-y space-y-2'>
      <div className='flex justify-between'>
        <p>{user.firstName} {user.secondName}</p>
        <div className='flex space-x-2 text-2xl'>
          {[...Array(5)].map((value, index, array) => {
            if (index < rating) {
              return <Star fill='yellow' key={index} className='text-yellow-200' size={30} />;
            } else {
              return <Star key={index} size={30} />;
            }
          })}
        </div>
      </div>
      <div>
        {reviewComment}
      </div>
    </div>
  );
};

