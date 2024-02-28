import { IBooking, ICreateReservationReq, ICreateReservationRes } from '@/@types/bookings';

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
      return await response.json() as ICreateReservationRes;
    } catch (e) {
      console.error('Failed to create reservation');
    }
  }

}
