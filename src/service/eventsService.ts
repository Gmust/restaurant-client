import { $authHost, $unAuthHost } from '@/src/service/index';

export class EventsService {

  static async fetchClosestEvents(): Promise<IEvent[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/closest`);
    const closestEvents = await response.json();
    return closestEvents;
  }

  static async fetchNearestEvents(): Promise<IEvent[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/nearest`);
    const nearestEvents = response.json();
    return nearestEvents;
  }

  static async getAllEvents(): Promise<IEvent[]> {
    try {
      const response = await $unAuthHost.get<IEvent[]>('/events');
      return response.data;
    } catch (e) {
      console.error('Failed to fetch all events', e);
      throw e;
    }
  }

  static async createEvent({ name, endDate, startDate, description }: ICreateEventReq) {
    try {
      const response = await $authHost.post<ICreateEventRes>('/events', {
        name,
        description,
        startDate,
        endDate,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to create event');
      throw e;
    }
  }

};
