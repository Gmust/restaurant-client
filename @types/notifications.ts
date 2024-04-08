import { Roles } from '@/@types/user';

export interface IChangeReceiveNewsReq {
  userId: string,
  receiveNews: boolean,
}

export interface IChangeReceiveNewsErrorRes {
  statusCode: number,
  message: string,
  error: string
}

export interface ISendNotificationReq {
  subject: string,
  role: Roles,
  message: string
}

export interface ISendNotificationRes {
  message: string
}
