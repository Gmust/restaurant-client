import { useQuery } from '@tanstack/react-query';

import { EventsService } from '../service/eventsService';

const useGetNearestEvents = (props: IEvent[]) => {
  return useQuery({
    queryKey: ['events'],
    queryFn: EventsService.fetchNearestEvents,
    initialData: props,
  });
};


export {
  useGetNearestEvents,
};
