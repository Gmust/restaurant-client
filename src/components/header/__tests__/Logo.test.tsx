import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Logo } from '@/src/components/header/Logo';


describe('Logo component', () => {
  it('Should render Logo by alt text', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText('restaurant-logo');

    expect(logoImage).toBeInTheDocument();
  });
});
