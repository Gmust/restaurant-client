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
  token: string;
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
  status: Statuses;
  orderItems: ICartItem[];
  totalPrice: number;
  takeaway: boolean;
  orderNumber: string;
  created_at: string;
  updated_at: string;
  statusCode: number;
}

export enum Statuses {
  completed = 'Completed',
  preparation = 'Preparation',
  pending = 'Pending',
  accepted = 'Accepted',
  declined = 'Declined',
}

export interface IUpdateOrderStatusReq {
  orderId: string,
  newStatus: Statuses,
  userId: string
}

export interface IUpdateOrderStatusRes {
  orderId: string,
  newStatus: Statuses,
  userId: string
}

export interface ICompleteOrderRes {
  message: string;
}


export interface UpdatedStatus {
  newStatus: Statuses,
  orderId: string
}

export interface IAdminOrdersStore {
  orders: IOrder[],
  actions: {
    completeOrder: (orderId: string) => void;
    updateOrderStatus: (updatedStatus: UpdatedStatus) => void;
    setOrders: (orders: IOrder[]) => void
  }
}
