import { ICartItem } from '@/@types/cart';


export interface IPayForOrderReq {
  email: string;
  totalPrice: number;
  cartItems: ICartItem[];
  takeaway: boolean;
  promoCode?: string;
  orderDate: string;
}

export interface IPayForOrderRes {
  sessionId: string;
}


export interface IConfirmOrderReq {
  email: string;
  orderNumber: string;
  confirmationToken: string;
}
