interface IEvent {
  name: string,
  description: string,
  startDate: string,
  endDate: string,
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


interface IChangeEventReq {
  name: string,
  description: string,
  eventId: string,
  startDate: Date,
  endDate: Date
}

interface IChangeEventRes {
  message: string,
  event: IEvent
}
