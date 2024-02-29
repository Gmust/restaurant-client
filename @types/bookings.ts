import { ITable } from '@/@types/tables';

export interface IBooking {
  _id: string,
  table: ITable,
  amountOfVisitors: number,
  timeOfReservation: ReservationTime,
  email: string,
  isConfirmed: boolean,
  created_at: string
  updated_at: string
}

export enum ReservationTime {
  '09:00' = '09:00',
  '09:30' = '09:30',
  '10:00' = '10:00',
  '10:30' = '10:30',
  '11:00' = '11:00',
  '11:30' = '11:30',
  '12:00' = '12:00',
  '12:30' = '12:30',
  '13:00' = '13:00',
  '13:30' = '13:30',
  '14:00' = '14:00',
  '14:30' = '14:30',
  '15:00' = '15:00',
  '15:30' = '15:30',
  '16:00' = '16:00',
  '16:30' = '16:30',
  '17:00' = '17:00',
}


export interface IAvailableTime {
  isAvailable: boolean,
  time: ReservationTime
}


export interface ICreateReservationReq {
  timeOfReservation: ReservationTime,
  table: number
  amountOfVisitors: number
  email: string
}


export interface ICreateReservationRes {
  message: string,
  newBooking: IBooking,
}


export interface ICreateReservationResError {
  error: string,
  message: string
  statusCode: number
}

export interface IConfirmReservationReq {
  tableNum: string,
  email: string,
  confirmed: boolean
  reservationId: string
}

export interface IConfirmReservationRes {
  message: string;
}
