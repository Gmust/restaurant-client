'use client';

import { IGetReviewsRes, IReview } from '@/@types/reviews';
import { ReviewCard } from '@/src/components/reviews/ReviewCard';
import { Paginator } from '@/src/components/menu/menuList/Paginator';
import { useCallback, useState } from 'react';
import { IFetchDishesResponse } from '@/@types/dishes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeToPrev } from '@/src/components/menu/menuList/ChangeToPrev';
import { ChangeToNext } from '@/src/components/menu/menuList/ChangeToNext';

export const ReviewsList = ({ pageTotal, data, currentPage: initialCurrenPage }: IGetReviewsRes) => {


  const [reviews, setReviews] = useState<IReview[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrenPage);
  const [totalPages, setTotalPages] = useState<number>(pageTotal);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );


  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-center'>
        <ChangeToPrev currentPage={currentPage} createQueryString={createQueryString} pageTotal={pageTotal} />
        <div className='grid grid-cols-1 md:grid-cols-2 mx-16 align-middle justify-items-center'>
          {data.map(review => <ReviewCard key={review._id} {...review} />)}
        </div>
        <ChangeToNext currentPage={currentPage} createQueryString={createQueryString} pageTotal={pageTotal} />
      </div>
      <Paginator currentPage={currentPage} pageTotal={pageTotal} setCurrentPage={setCurrentPage}
                 createQueryString={createQueryString} />
    </div>
  );
};

