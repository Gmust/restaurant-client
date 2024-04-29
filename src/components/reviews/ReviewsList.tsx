'use client';

import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import {  useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { IFetchDishesResponse } from '@/@types/dishes';
import { IGetReviewsRes, IReview } from '@/@types/reviews';
import { ChangeToNext } from '@/src/components/menu/menuList/ChangeToNext';
import { ChangeToPrev } from '@/src/components/menu/menuList/ChangeToPrev';
import { MobilePaginator } from '@/src/components/menu/menuList/MobilePaginator';
import { Paginator } from '@/src/components/menu/menuList/Paginator';
import { ReviewCard } from '@/src/components/reviews/ReviewCard';
import { useScreenSize } from '@/src/hooks/screen-size-hook';
import { ReviewsService } from '@/src/service/reviewsService';

export const ReviewsList = ({ pageTotal, data, currentPage: initialCurrenPage }: IGetReviewsRes) => {


  const [reviews, setReviews] = useState<IReview[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrenPage);
  const [totalPages, setTotalPages] = useState<number>(pageTotal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width } = useScreenSize();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {

    const getReviews = async () => {
      setIsLoading(true);
      try {
        const response = await ReviewsService.getAllReviews({
          skip: Number(searchParams.get('skip')),
          limit: Number(searchParams.get('limit')),
          newFirst: true,
          oldFirst: false,
        });
        setReviews(response.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response!.data.message);
        } else {
          toast.error('Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();

  }, [searchParams]);

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex justify-center'>
        {
          width > 780 ?
            <ChangeToPrev currentPage={currentPage} createQueryString={createQueryString} pageTotal={totalPages} />
            : null
        }
        {
          isLoading ? <Loader2 className='animate-spin' />
            :
            <div className='grid grid-cols-1 md:grid-cols-2 mx-16 align-middle justify-items-center gap-4'>
              {reviews.map(review => <ReviewCard key={review._id} {...review} />)}
            </div>
        }
        {
          width > 780 ?
            <ChangeToNext currentPage={currentPage} createQueryString={createQueryString}
                          pageTotal={totalPages} />
            : null
        }
      </div>
      {
        width > 780 ?
          <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pageTotal={totalPages}
                     createQueryString={createQueryString} />
          :
          <MobilePaginator createQueryString={createQueryString} pageTotal={totalPages} setCurrentPage={setCurrentPage}
                           currentPage={currentPage} />
      }
    </div>
  );
};

