import { useStore } from '@/src/hooks/use-store';
import { ICartStore } from '@/@types/cart';
import { useCartStore } from '@/src/store/cart-store';
import { OrderSekeleton } from '@/src/components/loaders/OrderSekeleton';
import { OrderItem } from '@/src/components/order/OrderItem';

export const OrderItems = () => {

  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state,
  );

  if (!cartStore) return <div><OrderSekeleton /></div>;
  const { cart, actions: { clearCart } } = cartStore;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 justify-items-center gap-y-4 animate-fadeInBottom'>
      {
        cart.cartItems.map(cartItem => <OrderItem quantity={cartItem.quantity}
                                                  dish={cartItem.dish}
                                                  _id={cartItem._id}
                                                  key={cartItem._id} />)
      }
    </div>
  );
};

