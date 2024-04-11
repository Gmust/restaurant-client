import { create } from 'zustand';
import { IAdminOrdersStore } from '@/@types/orders';


export const useAdminOrdersStore = create<IAdminOrdersStore>()(set => ({
  orders: [],
  selectedOrder: null,
  actions: {
    setOrders: (orders) => {
      set({
        orders,
      });
    },
    selectOrder: (order) => {
      set({
        selectedOrder: order,
      });
    },
    completeOrder: (orderId) => {
      set(state => ({
        orders: state.orders.filter(order => order._id != orderId),
      }));
    },
    updateOrderStatus: (updatedStatus) => {
      // @ts-ignore
      set(state => {
        const orderInList = state.orders.find((order) => order._id === updatedStatus.orderId);
        const index = state.orders.findIndex((order) => order._id === updatedStatus.orderId);
        if (orderInList) {
          const updatedOrders = [...state.orders];
          updatedOrders[index] = { ...orderInList, status: updatedStatus.newStatus };
          return {
            dishes: updatedOrders,
          };
        }
        return state;
      });
    },
  },
}));
