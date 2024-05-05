import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Account } from '@/src/components/header/Account';

jest.mock('../../../store/user-store.ts', () => ({
  useUserStore: jest.fn(() => ({
    user: {
      firstName: 'User',
    },
    actions: {
      removeUser: jest.fn(), // Empty function for now
      setIsAuth: jest.fn(),
    },
  })),
}));


describe('Account component', () => {
  it('should render with mocked user', () => {
    const user = {
      firstName: 'User',
    };
    // @ts-ignore
    render(<Account user={user} />);
    expect(screen.getByText('Welcome User!')).toBeInTheDocument();
  });
});
