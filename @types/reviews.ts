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
  skip?: string,
  limit?: string
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
