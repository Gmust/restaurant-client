import { create } from 'zustand';
import { IUserStore } from '@/@types/user';


export const useUserStore = create<IUserStore>()(set => ({
  user: null,
  isAuth: false,
  actions: {
    setUser: (user) =>
      set(state => ({
        user: user,
      })),
    removeUser: () =>
      set(state => ({
        user: null,
      })),
  },
}));
