import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { RestaurantImage } from '@/src/components/homePage/RestaurantImage';

describe('RestaurantImage component', () => {
    it('should render the restaurant image with correct alt attribute', () => {
      render(<RestaurantImage />);

      const restaurantImage = screen.getByAltText('restaurant-image');

      expect(restaurantImage).toBeInTheDocument();
    });
  },
);
