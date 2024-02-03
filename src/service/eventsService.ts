export const EventsService = {

  async fetchClosestEvents(): Promise<IEvent[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);
    const movies = await response.json();
    return movies
  },


};
