import { IPayForOrderReq, IPayForOrderRes } from '@/@types/orders';


export class OrderService {

  static async payForOrder({ totalPrice, cartItems }: IPayForOrderReq) {
    try {
      const data = JSON.stringify({ totalPrice, cartItems });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/payments/pay-for-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        },
      );

      return await response.json() as IPayForOrderRes;
    } catch (e) {
      console.error('Failed to pay for order', e);
    }
  }

}
