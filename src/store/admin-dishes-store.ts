import { create } from 'zustand';

import { IAdminDishesStore } from '@/@types/dishes';

export const useAdminDishesStore = create<IAdminDishesStore>()(set => ({
  dishes: [],
  actions: {
    setDishes: (dishes) => {
      set({
        dishes,
      });
    },
    createDish: (newDish) => {
      set((state) => ({
        dishes: [
          ...state.dishes,
          newDish,
        ],
      }));
    },
    deleteDish: (dishId) => {
      set(state => ({
        dishes: state.dishes.filter(dish => dish._id != dishId),
      }));
    },
    updateDish: (updatedDish) => {
      set(state => {
        const index = state.dishes.findIndex((d) => d._id === updatedDish._id);
        if (index !== -1) {
          const updatedDishes = [...state.dishes];
          updatedDishes[index] = updatedDish;
          return {
            dishes: updatedDishes,
          };
        }
        return state;
      });

    },
  },
}));
