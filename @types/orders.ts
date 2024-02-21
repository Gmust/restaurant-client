import { ICart, ICartItem } from '@/@types/cart';


export interface IPayForOrderReq {
  email: string
  totalPrice: number
  cartItems: ICartItem[]
  takeaway: boolean
  promoCode?: string
  orderDate: Date
}

export interface IPayForOrderRes {
  sessionId: string;
}
