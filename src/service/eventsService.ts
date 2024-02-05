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

};
