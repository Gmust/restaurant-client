import {
  IBooking,
  IConfirmReservationReq,
  IConfirmReservationRes,
  ICreateReservationReq,
  ICreateReservationRes,
  ICreateReservationResError,
} from '@/@types/bookings';

export class BookingService {

  static async fetchAllReservations(tableId: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/booking/get-all-reservations/${tableId}`);
      return await response.json() as IBooking[];
    } catch (e) {
      console.error('Failed to fetch all availableReservations for table');
    }
  }

  static async createReservation({ timeOfReservation, email, table, amountOfVisitors }: ICreateReservationReq) {
    try {
      const data = JSON.stringify({ timeOfReservation, email, table, amountOfVisitors: Number(amountOfVisitors) });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/booking/new-reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const dataRes = await response.json();

      if (dataRes.statusCode) {
        return dataRes as ICreateReservationResError;
      } else {
        return dataRes as ICreateReservationRes;
      }
    } catch (e) {
      console.error('Failed to create reservation');
    }
  }

  static async confirmReservation({ confirmed, email, tableNum, reservationId }: IConfirmReservationReq) {
    try {
      const data = JSON.stringify({ confirmed, email, table: tableNum, reservationId });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/booking/confirm-reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });

      return await response.json() as IConfirmReservationRes;
    } catch (e) {
      console.error(e);
      console.error('Failed to confirm/deny reservation');
    }
  }
}
