import { IAddToCartResponse, ICart } from '@/@types/cart';

export class CartService {

  static async fetchCart(): Promise<ICart> {

    return {
      _id: '',
      totalPrice: 0,
      cartItems: [],
    };
  }

  static async addToCart(): Promise<IAddToCartResponse> {
    return {
      cart: {
        cartItems: [],
        _id: '',
        totalPrice: 0,
      },
      message: 'dsasd',
    };
  }

  static async removeFromCart() {


  }

}
