import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { DishCategories, IFetchSpecialtiesResponse } from '@/@types/dishes';
import { Units } from '@/@types/ingredients';
import { SpecialtiesMenu } from '@/src/components/homePage/SpecialtiesMenu';


const mockedSpecialtiesMenu: IFetchSpecialtiesResponse = {
  specialtyDishes: [
    {
      name: 'Test 1',
      _id: 'dsdsds',
      category: DishCategories.SideDish,
      image: '',
      price: 100,
      dishWeight: 100,
      ingredients: [{ name: 'test', _id: 'dsds', unit: Units.Gram, quantity: '100' }],
      preparationTime: '60m',
      isVegan: true,
      description: 'test desc',
      isAvailable: true,
    },
  ],
  _id: 'dsds',
  created_at: '2024-02-26T18:50:37.318Z',
  updated_at: '2024-02-26T18:50:37.318Z',
};

describe('Specialties menu page', () => {
  it('Should render specialties menu', async () => {
    render(await <SpecialtiesMenu specialtiesMenu={mockedSpecialtiesMenu} />);


    // Check if the title is rendered
    expect(screen.getByText('Specialties menu')).toBeInTheDocument();

    // Check if each specialty dish is rendered
    mockedSpecialtiesMenu.specialtyDishes.forEach((menuItem) => {
      expect(screen.getByText(menuItem.name)).toBeInTheDocument();
      expect(screen.getByText(`${menuItem.price}$`)).toBeInTheDocument();
      expect(screen.getByText(menuItem.description)).toBeInTheDocument();
    });

    // Check if the "Whole menu" button is rendered
    expect(screen.getByRole('button', { name: 'Whole menu' })).toBeInTheDocument();
  });
});

