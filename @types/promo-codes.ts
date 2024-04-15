interface IPromoCode {
  _id: string
  promoCode: string,
  expiresIn: string,
  discountValue: number,
  created_at: string,
  updated_at: string
}


interface ICreatePromoCodeReq {
  promoCode: string,
  expiresIn: string,
  discountValue: number
}

interface ICreatePromoCodeRes {
  message: string,
  newPromoCode: {
    promoCode: string,
    expiresIn: string,
    discountValue: number
  }
}


interface IAdminPromoCodesStore {
  promoCodes: IPromoCode[],
  actions: {
    deletePromoCode: (promoCodeId: string) => void;
    createPromoCode: (promoCode: ICreatePromoCodeReq) => void;
    setPromoCodes: (promoCodes: IPromoCode[]) => void
  }
}
