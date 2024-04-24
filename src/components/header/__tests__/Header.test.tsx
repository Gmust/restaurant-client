import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Header } from '@/src/components/header/Header';
import { useUserStore } from '@/src/store/user-store';

jest.mock('../../../store/user-store.ts', () => ({
  useUserStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    };
  },
}));

describe('Header component', () => {
  beforeEach(() => {
    // Mock the return value of useUserStore hook
    // @ts-ignore
    (useUserStore as jest.Mock).mockReturnValue({ isAuth: true });
  });

  it('Should render component with auth user', () => {
    render(<Header />);

    expect(screen.getByAltText('restaurant-logo')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Booking')).toBeInTheDocument();
    expect(screen.getByTestId('account-info')).toBeInTheDocument();
    expect(screen.getByTestId('shopping-cart')).toBeInTheDocument();
  });

  it('Should render component with unauthenticated user', () => {
    // @ts-ignore
    (useUserStore as jest.Mock).mockReturnValue({ isAuth: false });

    render(<Header />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
