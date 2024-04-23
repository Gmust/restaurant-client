import {
  IAddToCartReq,
  IAddToCartRes,
  ICart,
  IChangeCartItemQuantityReq,
  IRemoveFromCartReq,
  IRemoveFromCartRes,
} from '@/@types/cart';
import { $authHost } from '@/src/service/index';

export class CartService {

  // static async fetchCart(cartId: string, token: string): Promise<ICart | undefined> {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart?cartId=${cartId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //
  //     return await response.json() as ICart;
  //   } catch (e) {
  //     console.error('Failed to fetch cart', e);
  //   }
  // }
  static async fetchCart(cartId: string): Promise<ICart | undefined> {
    try {
      const response = await $authHost.get<ICart>('/cart', {
        params: {
          cartId,
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (e) {
      console.error('Failed to fetch cart', e);
    }
  }

  static async addToCart({ _id, quantity, dish }: IAddToCartReq): Promise<IAddToCartRes | undefined> {
    try {
      const response = await $authHost.post<IAddToCartRes>(`/cart/add-to-cart`, {
        _id,
        quantity,
        dish,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to add to cart:', e);
    }
  }

  static async removeFromCart({ cartId, cartItemId }: IRemoveFromCartReq) {
    try {
      const response = await $authHost.delete<IRemoveFromCartRes>('/cart/remove-from-cart', {
        data: {
          cartId,
          cartItemId,
        },
      });

      return response.data;
    } catch (e) {
      console.error('Failed to remove from cart', e);
    }
  }

  static async emptyCart(cartId: string) {
    try {
      const response = await $authHost.delete<{ message: string }>('/cart/empty-cart', {
        data: {
          cartId,
        },
      });

      return response.data;
    } catch (e) {
      console.error('Failed to empty cart', e);
    }
  }

  static async changeCartItemQuantity({ cartItemId, cartId, newQuantity }: IChangeCartItemQuantityReq) {
    try {
      const response = await $authHost.post<ICart>('/cart/change-quantity', {
          cartItemId,
          cartId,
          newQuantity,
        },
      );

      return response.data;
    } catch (e) {
      console.error('Failed to change quantity', e);
    }
  }
}
