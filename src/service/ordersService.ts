import {
  IConfirmOrderReq,
  IGetOrderInfoReq,
  IOrder,
  IGuestPayForOrderReq,
  IPayForOrderRes,
  IUserPayForOrderReq, IUserOrder,
} from '@/@types/orders';


export class OrdersService {

  static async payForGuestOrder({
                                  totalPrice,
                                  cartItems,
                                  orderDate,
                                  email,
                                  takeaway,
                                  promoCode,
                                }: IGuestPayForOrderReq) {
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

  static async payForUserOrder({ orderDate, email, takeaway, promoCode, token }: IUserPayForOrderReq) {
    try {
      const data = JSON.stringify({
        orderDate,
        email,
        takeaway,
        promoCode,
      });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/payments/user-pay-for-order`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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

  static async deleteOrder(orderId: string) {
    try {
      const data = JSON.stringify({ orderId });
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/orders/delete-order`, {
        method: 'DELETE',
        body: data,
      });

      return await response.json();
    } catch (e) {
      console.error('Failed to delete order');
    }
  }

  static async getUserOrders(userId: string, token: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/orders?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json() as IUserOrder[];
    } catch (e) {
      console.error('Failed to get all user orders', e);
    }
  }
}
