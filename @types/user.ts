import { ICart } from '@/@types/cart';
import { IOrder } from '@/@types/orders';


export enum Roles {
  user = 'User',
  administrator = 'Administrator',
  cook = 'Cook',
}


export interface IUser {
  _id: string,
  firstName: string
  secondName: string
  email: string
  role: Roles
  cart: ICart
  orders: IOrder[]
  review: any
  receiveNews: boolean
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
}

export interface IUserStore {
  user: IUser | null,
  isAuth: boolean,
  actions: {
    setUser: (user: IUser) => void,
    removeUser: () => void,
    setIsAuth: (isAuth: boolean) => void
  }
}
