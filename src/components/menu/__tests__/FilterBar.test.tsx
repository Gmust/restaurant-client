import { fireEvent, getByLabelText, getByTestId, render, renderHook, screen } from '@testing-library/react';
import { useCallback } from 'react';

import { DishCategories } from '@/@types/dishes';
import { FilterBar } from '@/src/components/menu/FilterBar';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    location: { search: '' } // Provide an initial empty search string
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({ toString: jest.fn(() => '') })),
}));

jest.mock('react', () => ({
  useState: jest.fn(() => [false, jest.fn()]),
  useEffect: jest.fn(),
}));

describe('Filter bar', () => {
  it('should render with initial state', () => {
    render(<FilterBar />);
    const veganCheckbox = screen.getByTestId('isVegan-checkbox');
    const categorySelect = screen.getByTestId('dish-category');

    expect(veganCheckbox).not.toBeInTheDocument();
    // @ts-ignore
    expect(categorySelect.value).toBe(DishCategories.All);
  });

  it('should toggle the isVegan state and update URL on vegan checkbox change', () => {
    render(<FilterBar />);
    const veganCheckbox = screen.getByTestId('isVegan-checkbox');

    fireEvent.click(veganCheckbox);

    expect(screen.getByTestId('isVegan-checkbox')).toBeChecked();

    expect(history.state.search).toContain('isVegan=true');

    fireEvent.click(veganCheckbox);

    expect(screen.getByTestId('isVegan-checkbox')).not.toBeChecked();
    expect(history.state.search).not.toContain('isVegan=true');
  });

  it('should update the currentCategory state and URL on category select change', () => {
    render(<FilterBar />);
    const categorySelect = screen.getByLabelText('Select category:');

    fireEvent.change(categorySelect, { target: { value: DishCategories.Appetizer } });

    // @ts-ignore
    expect(screen.getByLabelText('Select category:').value).toBe(DishCategories.Appetizer);
    expect(history.state.search).toContain('category=Appetizer');

    fireEvent.change(categorySelect, { target: { value: DishCategories.All } });

    // @ts-ignore
    expect(screen.getByLabelText('Select category:').value).toBe(DishCategories.All);
    expect(history.state.search).not.toContain('category');
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  // @ts-ignore
  jest.spyOn(window, 'location', 'get').mockReturnValue('?oldParams');
  it('should create a query string with the provided name and value', () => {
    const { result } = renderHook(() => createQueryString('testParam', 'testValue'));

    const queryString = result.current;

    expect(queryString).toBe('?oldParams&testParam=testValue');
  });
});
