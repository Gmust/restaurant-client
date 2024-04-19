import { AxiosError } from 'axios';

import {
  IChangeReviewReq,
  ICreateReviewReq,
  ICreateReviewRes,
  IGetReviewsReq,
  IGetReviewsRes,
  IReview,
} from '@/@types/reviews';
import { IUser } from '@/@types/user';
import { $authHost, $unAuthHost } from '@/src/service/index';
import { generateQuery } from '@/src/utils/generateQuery';

export class ReviewsService {

  static async getUserReview(reviewId: string) {
    try {
      const response = await $authHost.get<IReview>(`/reviews/${reviewId}`);

      return response.data;
    } catch (e) {
      console.error('Failed to fetch user', e);
    }
  }

  static async getAllReviews(params: IGetReviewsReq) {
    const queryStr = generateQuery(params);
    try {
      const response = await $unAuthHost.get<IGetReviewsRes>(`/reviews?${queryStr}`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error('Failed to fetch all reviews', e.response!.data);
      }
      throw e;
    }
  }

  static async createReview({ userId, rating, comment }: ICreateReviewReq) {
    try {
      const response = await $authHost.post<ICreateReviewRes>('/reviews', {
        userId,
        rating,
        comment,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to create review', e);
    }
  }

  static async changeReview({ reviewId, newRating, newComment }: IChangeReviewReq) {
    try {
      const response = await $authHost.patch<ICreateReviewRes>('/reviews/update-review', {
        reviewId,
        newRating,
        newComment,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to patch review', e);
    }
  }

}
