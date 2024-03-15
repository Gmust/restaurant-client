import {
  IAddToCartReq,
  IAddToCartRes,
  ICart,
  IChangeCartItemQuantityReq,
  IRemoveFromCartReq,
  IRemoveFromCartRes,
} from '@/@types/cart';

export class CartService {

  static async fetchCart(cartId: string, token: string): Promise<ICart | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/cart?cartId=${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as ICart;
    } catch (e) {
      console.error('Failed to fetch cart', e);
    }
  }

  static async addToCart({ _id, quantity, dish, token }: IAddToCartReq): Promise<IAddToCartRes | undefined> {
    try {
      const data = JSON.stringify({ _id, quantity, token });

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/cart/add-to-cart`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as IAddToCartRes;
    } catch (e) {
      console.error('Failed to add to cart:', e);
    }
  }

  static async removeFromCart({ cartId, cartItemId, token }: IRemoveFromCartReq) {
    try {

      const data = JSON.stringify({
        cartId,
        cartItemId,
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/cart/remove-from-cart`, {
        method: 'DELETE',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as IRemoveFromCartRes;
    } catch (e) {
      console.error('Failed to remove from cart', e);
    }
  }

  static async emptyCart(cartId: string, token: string) {
    try {

      const data = JSON.stringify({ cartId });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/cart/empty-cart`, {
        body: data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as { message: string };
    } catch (e) {
      console.error('Failed to empty cart', e);
    }
  }

  static async changeCartItemQuantity({ cartItemId, cartId, newQuantity, token }: IChangeCartItemQuantityReq) {
    try {

      const data = JSON.stringify({ cartItemId, cartId, newQuantity });

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/cart/change-quantity`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as ICart;
    } catch (e) {
      console.error('Failed to change quantity', e);
    }
  }
}
