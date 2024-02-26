import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { EventsPanel } from '@/src/components/homePage/eventsPanel/EventsPanel';

const mockedEventsPanelProps = {
  closestEvents: [
    {
      name: 'Event 1',
      description: 'Description of Event 1',
      startDate: new Date('2024-02-25T10:00:00'),
      endDate: new Date('2024-02-25T12:00:00'),
      _id: '1',
    },
  ],
  nearestEvents: [
    {
      name: 'Event 2',
      description: 'Description of Event 2',
      startDate: new Date('2024-02-26T15:00:00'),
      endDate: new Date('2024-02-26T17:00:00'),
      _id: '2',
    },
  ],
};

describe('Events Panel component', () => {

  it('Should correctly render  closest components', () => {

    render(
      <EventsPanel closestEvents={mockedEventsPanelProps.closestEvents}
                   nearestEvents={mockedEventsPanelProps.nearestEvents} />,
    );
    expect(screen.getByTestId('events-panel')).toBeInTheDocument();
    expect(screen.getByText('Closest')).toBeInTheDocument();
    expect(screen.queryByText('Nearest')).toBeInTheDocument();
    expect(screen.queryByText('Event 1')).toBeInTheDocument();
  });


  it('Should switch between closest and nearest events', () => {
    render(
      <EventsPanel closestEvents={mockedEventsPanelProps.closestEvents}
                   nearestEvents={mockedEventsPanelProps.nearestEvents} />,
    );

    const nearestEventButton = screen.getByText('Nearest');
    fireEvent.click(nearestEventButton);
    expect(screen.queryByText('Event 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Event 2')).toBeInTheDocument();
  });

});
