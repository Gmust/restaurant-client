interface IEvent {
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  _id: string
}

interface ICreateEventReq {
  name: string,
  description: string,
  startDate: string,
  endDate: string,
}

interface ICreateEventRes {
  message: string,
  newEvent: IEvent
}
