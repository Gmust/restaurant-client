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

  static async updateEvent(updatedEvent: IChangeEventReq) {
    try {
      const response = await $authHost.patch<IChangeEventRes>('/events/change-info', updatedEvent);

      return response.data;
    } catch (e) {
      console.error('Failed to update event');
      throw e;
    }
  }

  static async deleteEvent(eventId: string) {
    try {
      const response = await $authHost.delete<{ message: string }>(`/events/${eventId}`);

      return response.data;
    } catch (e) {
      console.error('Failed to delete event');
      throw e;
    }
  }
};
