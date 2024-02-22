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


export interface IGetOrderInfoReq {
  orderNumber: string,
  email: string
}

export interface IOrder {
  isConfirmed: boolean;
  _id: string;
  email: string;
  status: string;
  orderItems: ICartItem[];
  totalPrice: number;
  takeaway: boolean;
  orderNumber: string;
  created_at: string;
  updated_at: string;
}

