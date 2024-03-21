import { $authHost, $unAuthHost } from '@/src/service/index';
import { IUser } from '@/@types/user';
import { ICreateReviewReq, ICreateReviewRes, IGetReviewsReq, IGetReviewsRes, IReview } from '@/@types/reviews';
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
      console.error('Failed to fetch all reviews');
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

}