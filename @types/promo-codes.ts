interface IPromoCode {
  _id: string
  promoCode: string,
  expiresIn: string,
  discountValue: string,
  created_at: string,
  updated_at: string
}


interface ICreatePromoCodeReq {
  promoCode: string,
  expiresIn: string,
  discountValue: string
}

interface ICreatePromoCodeRes {
  message: string,
  newPromoCode: {
    promoCode: string,
    expiresIn: string,
    discountValue: string
  }
}


interface IAdminPromoCodesStore {
  promoCodes: IPromoCode[],
  actions: {
    deletePromoCode: (promoCodeId: string) => void;
    createPromoCode: (promoCode: IPromoCode) => void;
    setPromoCodes: (promoCodes: IPromoCode[]) => void
  }
}
