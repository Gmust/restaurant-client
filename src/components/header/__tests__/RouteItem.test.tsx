import  '@testing-library/jest-dom'
import { RouteItem } from '@/src/components/header/RouteItem';
import { render, screen } from '@testing-library/react';


describe('Route item component', () => {
  it('renders RouteItem component with correct name and path', () => {
    const name = 'Home';
    const path = '/home';

    render(<RouteItem name={name} path={path} />);

    const linkElement = screen.getByText(name);
    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute('href', path);
  });
});
