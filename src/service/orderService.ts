import { IConfirmOrderReq, IGetOrderInfoReq, IOrder, IPayForOrderReq, IPayForOrderRes } from '@/@types/orders';


export class OrderService {

  static async payForGuestOrder({ totalPrice, cartItems, orderDate, email, takeaway, promoCode }: IPayForOrderReq) {
    try {
      const data = JSON.stringify({ totalPrice, cartItems, orderDate, email, takeaway, promoCode });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/payments/guest-pay-for-order`, {
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

  static async confirmOrder({ orderNumber, confirmationToken, email }: IConfirmOrderReq) {
    try {
      const data = JSON.stringify({ orderNumber, email, confirmationToken });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/orders/confirm-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        },
      );

      return await response.json();
    } catch (e) {
      console.error('Failed to confirm order');
    }
  }

  static async fetchOrderInfo({ orderNumber, email }: IGetOrderInfoReq): Promise<IOrder | undefined> {
    try {
      const data = JSON.stringify({ orderNumber, email });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/orders/get-order-info`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        },
      );

      return await response.json() as IOrder;
    } catch (e) {
      console.error('Failed to fetch order info');
    }
  }

}
