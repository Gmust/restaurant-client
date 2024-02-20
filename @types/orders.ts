import { ICart, ICartItem } from '@/@types/cart';


export interface IPayForOrderReq {
  cartItems: ICartItem[],
  totalPrice: number
}

export interface IPayForOrderRes {
  sessionId: string;
}
