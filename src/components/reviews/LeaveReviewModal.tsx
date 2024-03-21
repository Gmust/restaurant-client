import { Modal } from '@/src/components/shared/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FaRegAngry, FaRegFrown, FaRegGrinAlt, FaRegGrinHearts, FaRegMeh } from 'react-icons/fa';
import { RatingMessages } from '@/src/components/reviews/RatingMessages';
import { Button } from '@/src/components/shared/Button';
import toast from 'react-hot-toast';
import { ReviewsService } from '@/src/service/reviewsService';
import { useUserStore } from '@/src/store/user-store';
import { useRouter } from 'next/navigation';


interface ILeaveReviewModal {
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean
}

export const LeaveReviewModal = ({ setIsActive, isActive }: ILeaveReviewModal) => {

  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [isLoading, setISLoading] = useState<boolean>(false);
  const user = useUserStore(state => state.user);
  const router = useRouter();

  if (!user) {
    setIsActive(false);
  }

  const createReview = async () => {
    if (!rating) return;
    if (!review) return;
    try {
      const response = await ReviewsService.createReview({
        comment: review,
        rating: currentRating!,
        userId: user?._id!,
      });
      if (response) {
        toast(response.message);
        setIsActive(false);
        router.refresh();
      }
    } catch (e) {
      toast.error('Something went wrong, leave your ');
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col p-2 items-center space-y-4'>
          <textarea id='message' rows={4}
                    className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write your review here...' onChange={e => setReview(e.target.value)}>
          </textarea>
        <div className='flex space-x-3'>
          {
            [...Array(5)].map((star, index) => {
              const rating = index + 1;
              return <label key={index}>
                <input type='radio' name='rating' value={rating} onChange={() => setRating(rating)}
                       className='hidden' />
                <Star
                  onMouseEnter={() => {
                    setHover(rating);
                    setCurrentRating(rating);
                  }}
                  className={cn('cursor-pointer text-gray-500 shadow-2xls', {
                    // @ts-ignore
                    'text-yellow-200': rating <= (hover || rating),
                  })}
                  // @ts-ignore
                  fill={rating <= (hover || rating) ? 'yellow' : 'gray'}
                  size={35}
                />
              </label>;
            })
          }
        </div>
        {
          currentRating && <RatingMessages currentRating={currentRating} />
        }
        <Button className='w-full' disabled={!review || !currentRating} onClick={createReview} isLoading={isLoading}>
          Send review
        </Button>
      </div>
    </Modal>
  );
};

