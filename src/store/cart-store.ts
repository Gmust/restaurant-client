import { create } from 'zustand';
import { ICartStore } from '@/@types/cart';
import { persist } from 'zustand/middleware';
import { CartService } from '@/src/service/cartService';
import { useUserStore } from '@/src/store/user-store';
import { randomUUID } from 'crypto';

export const userCartStore = create<ICartStore>()(persist(
  set => ({
    cart: {
      _id: '',
      cartItems: [],
      totalPrice: 0,
    },
    actions: {
      setCart: async (userCart) => {
        if (useUserStore.getState().user) {

          const cart = await CartService.fetchCart();
          set({
            cart,
          });
        }
      },
      addToCart: async (dish, quantity) => {
        if (useUserStore.getState().user) {
          const updatedCart = await CartService.addToCart();
          set({
            cart: {
              _id: updatedCart.cart._id,
              totalPrice: updatedCart.cart.totalPrice,
              cartItems: updatedCart.cart.cartItems,
            },
          });
        } else {
          set(state => ({
            cart: {
              _id: state.cart._id,
              totalPrice: state.cart.totalPrice + (dish.price * quantity),
              cartItems: [...state.cart.cartItems, { dish, quantity, _id: randomUUID() }],
            },
          }));
        }
      },
      removeFromCart: (dish) =>
        set(state => ({
          cart: {
            cartItems: state.cart.cartItems.filter(cartItem => cartItem._id !== dish._id),
            totalPrice: state.cart.totalPrice - dish.price,
            _id: state.cart._id,
          },
        })),
      clearCart: () =>
        set(state => ({})),
    },
  }),
  { name: 'cart-store', skipHydration: true },
));
