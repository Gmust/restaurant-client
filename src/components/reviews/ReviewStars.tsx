import { Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Dispatch, SetStateAction } from 'react';


interface IReviewStarsProps {
  setRating: Dispatch<SetStateAction<number | null>>,
  setHover: Dispatch<SetStateAction<number | null>>,
  setCurrentRating: Dispatch<SetStateAction<number | null>>,
  hover: number | null,
  initialRating?: number
}

export const ReviewStars = ({ setRating, setCurrentRating, setHover, hover, initialRating }: IReviewStarsProps) => {

  return (
    <>
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
    </>
  );
};

