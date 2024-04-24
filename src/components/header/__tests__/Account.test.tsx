import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Account } from '@/src/components/header/Account';
import { useUserStore } from '@/src/store/user-store';

jest.mock('../../../store/user-store.ts', () => ({
  useUserStore: jest.fn(),
}));


describe('Account component', () => {
  it('should render with mocked user', () => {
    // @ts-ignore
    (useUserStore as jest.Mock).mockReturnValue({
      user: {
        firstName: 'User'
      },
    });
    render(<Account />);
    expect(screen.getByText('Welcome User!')).toBeInTheDocument();
  });
});
