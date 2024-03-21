export interface IChangeReceiveNewsReq {
  userId: string,
  receiveNews: boolean,
}

export interface IChangeReceiveNewsErrorRes {
  statusCode: number,
  message: string,
  error: string
}
