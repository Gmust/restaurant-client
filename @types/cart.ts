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
    updateCartItem: (dish: IDish, quantity: number) => void,
    removeFromCart: (dish: IDish, cartItemId?: string) => void
    clearCart: () => void
  };
}


export interface IAddToCartReq {
  _id: string,
  dish: IDish,
  quantity: number,
}

export interface IAddToCartRes {
  message: string,
  cart: ICart
}


export interface IRemoveFromCartReq {
  cartItemId: string,
  cartId: string
}


export interface IRemoveFromCartRes {
  message: string,
  cart: ICart
}

export interface IChangeCartItemQuantityReq {
  newQuantity: number,
  cartItemId: string,
  cartId: string,
}

