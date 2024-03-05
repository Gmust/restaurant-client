import { IUser } from '@/@types/user';

export interface ILoginResponse {
  statusCode?: number,
  message: string
}


export interface IConfirmAccount {
  token: string,
  email: string
}

export interface IUserLoginReq {
  email: string,
  password: string
}


export interface IUserLoginRes {
  access_token: string,
  refresh_token: string,
  user: IUser
}
