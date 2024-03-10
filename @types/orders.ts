import { ICartItem } from '@/@types/cart';
import { IUser } from '@/@types/user';
import { IDish } from '@/@types/dishes';


export interface IGuestPayForOrderReq {
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


export interface IUserPayForOrderReq {
  email: string;
  takeaway: boolean;
  promoCode?: string;
  orderDate: string;
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

export interface IOrderItem {
  _id: string,
  quantity: number,
  dish: IDish
}

export interface IUserOrder {
  _id: string;
  isConfirmed: boolean;
  user: IUser;
  status: string;
  orderItems: IOrderItem[];
  totalPrice: number;
  takeaway: boolean;
  orderNumber: string;
  created_at: string;
  updated_at: string;
  statusCode: number;
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
  statusCode: number;
}

