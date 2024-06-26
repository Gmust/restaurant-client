import { persistNSync } from 'persist-and-sync';
import { create } from 'zustand';

import { ICartStore } from '@/@types/cart';
import { CartService } from '@/src/service/cartService';
import { useUserStore } from '@/src/store/user-store';

export const useCartStore = create<ICartStore>()(
  persistNSync(
    set => ({
      cart: {
        _id: '',
        cartItems: [],
        totalPrice: 0,
      },
      actions: {
        setCart: async (userCart) => {
          if (useUserStore.getState().user) {
            const cart = await CartService.fetchCart(userCart._id!);
            set({
              cart: cart,
            });
          }
        },
        updateCartItem: async (dish, quantity) => {
          set(state => {
            const itemIndex = state.cart.cartItems.findIndex(item => item.dish._id === dish._id);

            if (itemIndex !== -1) {
              const updatedCartItems = [...state.cart.cartItems];
              const updatedItem = { ...updatedCartItems[itemIndex] };
              const newPrice = state.cart.totalPrice + (quantity - updatedItem.quantity) * updatedItem.dish.price;

              updatedItem.quantity = quantity;
              updatedCartItems[itemIndex] = updatedItem;
              return {
                cart: {
                  ...state.cart,
                  cartItems: updatedCartItems,
                  totalPrice: newPrice,
                },
              };
            }
            return state;
          });
        },
        addToCart: async (dish, quantity) => {
          if (useUserStore.getState().user) {
            const updatedCart = await CartService.addToCart({
              _id: useUserStore.getState().user?.cart._id!,
              quantity: quantity,
              dish: dish,
            });
            set({
              cart: {
                _id: updatedCart!.cart._id,
                totalPrice: updatedCart!.cart.totalPrice,
                cartItems: updatedCart!.cart.cartItems,
              },
            });
          } else {
            set(state => ({
              cart: {
                ...state.cart,
                totalPrice: state.cart.totalPrice + (dish.price * quantity),
                cartItems: [...state.cart.cartItems, { dish, quantity, _id: `${dish._id}${quantity}` }],
              },
            }));
          }
        },
        removeFromCart: async (dish, cartItemId) => {
          console.log(useUserStore.getState().user);
          if (useUserStore.getState().user) {
            await CartService.removeFromCart({
              cartId: useUserStore.getState().user?.cart._id!,
              cartItemId: cartItemId!,
            });
          }

          set(state => {
            return {
              cart: {
                cartItems: state.cart.cartItems.filter(cartItem => cartItem._id === dish._id),
                totalPrice: state.cart.totalPrice - dish.price,
                _id: state.cart._id,
              },
            };
          });
        },
        clearCart: async () => {
          if (useUserStore.getState().user) {
            await CartService.emptyCart(useUserStore.getState().user?.cart._id!);
          }

          set(state => ({
            cart: {
              ...state.cart,
              cartItems: [],
              totalPrice: 0,
            },
          }));
        },
      },
    }),
    { name: 'cart-store' },
  ));
