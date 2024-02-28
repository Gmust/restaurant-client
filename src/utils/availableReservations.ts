import { IAvailableTime, ReservationTime } from '@/@types/bookings';


export const availableReservations: IAvailableTime[] = createAvailableTimes();


function createAvailableTimes(): IAvailableTime[] {
  const availableTimes: IAvailableTime[] = [];

  Object.keys(ReservationTime).forEach((key) => {
    //@ts-ignore
    const time = ReservationTime[key];
    availableTimes.push({ time, isAvailable: true });
  });

  return availableTimes;
};
