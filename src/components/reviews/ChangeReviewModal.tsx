import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { IReview } from '@/@types/reviews';
import { RatingMessages } from '@/src/components/reviews/RatingMessages';
import { ReviewStars } from '@/src/components/reviews/ReviewStars';
import { Button } from '@/src/components/shared/Button';
import { Modal } from '@/src/components/shared/Modal';
import { ReviewsService } from '@/src/service/reviewsService';
import { useUserStore } from '@/src/store/user-store';


interface IChangeReviewModalProps {
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean,
  initialReview: Omit<IReview, 'user'>
}

export const ChangeReviewModal = ({ initialReview, isActive, setIsActive }: IChangeReviewModalProps) => {

  const [review, setReview] = useState<string>(initialReview.reviewComment);
  const [currentRating, setCurrentRating] = useState<number | null>(initialReview.rating);
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [isLoading, setISLoading] = useState<boolean>(false);
  const router = useRouter();


  const changeReview = async () => {
    if (!rating) return;
    if (!review) return;
    try {
      const response = await ReviewsService.changeReview({
        newComment: review,
        newRating: currentRating!,
        reviewId: initialReview?._id!,
      });
      if (response) {
        toast.success(response.message);
        setIsActive(false);
        router.refresh();
      }
    } catch (e) {
      toast.error('Something went wrong, try to change your review later');
    }
  };

  return (
    <Modal setIsActive={setIsActive} isActive={isActive}>
      <div className='flex flex-col p-2 items-center space-y-4'>
          <textarea id='message' rows={4}
                    className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write your review here...' onChange={e => setReview(e.target.value)}
                    defaultValue={initialReview.reviewComment}>
          </textarea>
        <div className='flex space-x-3'>
          <ReviewStars hover={hover} setRating={setRating} setHover={setHover} setCurrentRating={setCurrentRating} initialRating={initialReview.rating} />
        </div>
        {
          currentRating && <RatingMessages currentRating={currentRating} />
        }
        <Button className='w-full' disabled={!review || !currentRating} onClick={changeReview} isLoading={isLoading}>
          Change review
        </Button>
      </div>
    </Modal>
  );
};

