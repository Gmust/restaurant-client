import { $authHost, $unAuthHost } from '@/src/service/index';
import { IUser } from '@/@types/user';
import { IGetReviewsReq, IGetReviewsRes, IReview } from '@/@types/reviews';
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

}
