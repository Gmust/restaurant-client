import { ICart } from '@/@types/cart';


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
  cart: ICart[]
  orders: []
  review: any
  receiveNews: boolean
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
