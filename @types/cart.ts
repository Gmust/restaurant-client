import { IDish } from '@/@types/dishes';


export interface ICart {
  _id: string,
  cartItems: ICartItem[] | [],
  totalPrice: number
}

export interface ICartItem {
  quantity: number,
  dish: IDish,
  _id: string | null
}

export interface ICartStore {
  cart: ICart;
  actions: {
    setCart: (userCart: ICart) => void
    addToCart: (dish: IDish, quantity: number) => void,
    removeFromCart: (dish: IDish) => void
    clearCart: () => void
  };
}


export interface IAddToCartResponse {
  message: string,
  cart: ICart
}
