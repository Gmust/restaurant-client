export interface IChangeReceiveNewsReq {
  userId: string,
  receiveNews: boolean,
  token: string
}

export interface IChangeReceiveNewsErrorRes {
  statusCode: number,
  message: string,
  error: string
}
