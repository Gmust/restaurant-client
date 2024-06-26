import { IUser } from '@/@types/user';

export interface IReview {
  _id: string
  user: IUser,
  rating: number,
  reviewComment: string
}


export interface IGetReviewsReq {
  oldFirst: boolean,
  newFirst: boolean
  skip?: number,
  limit?: number
}

export interface IGetReviewsRes {
  data: IReview[],
  pageTotal: number,
  currentPage: number
}

export interface ICreateReviewReq {
  comment: string,
  rating: number,
  userId: string
}

export interface ICreateReviewRes {
  newReview: IReview;
  message: string;
}

export interface IChangeReviewReq {
  reviewId: string;
  newRating: number;
  newComment: string;
}

export interface IChangeReviewRes {
  review: IReview;
  message: string;
}
