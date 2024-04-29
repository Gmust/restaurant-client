import { create } from 'zustand';


export const useAdminPromoCodesStore = create<IAdminPromoCodesStore>()(set => ({
  promoCodes: [],
  actions: {
    createPromoCode: (promoCode) => {
      // @ts-ignore
      set(state => ({
        promoCodes: [...state.promoCodes, promoCode],
      }));
    },
    setPromoCodes: (promoCodes) => {
      set({
        promoCodes,
      });
    },
    deletePromoCode: (promoCodeId) => {
      set(state => ({
        promoCodes: state.promoCodes.filter(promoCode => promoCode._id != promoCodeId),
      }));
    },
  },
}));
