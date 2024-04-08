import {
  IChangeReceiveNewsErrorRes,
  IChangeReceiveNewsReq,
  ISendNotificationReq,
  ISendNotificationRes,
} from '@/@types/notifications';
import { IUser } from '@/@types/user';
import { $authHost } from '@/src/service/index';


export class NotificationsService {

  static async changeUserReceiveNews({ userId, receiveNews }: IChangeReceiveNewsReq) {
    try {

      const response = await $authHost.patch(`/users/change-receive-news`, {
        userId,
        receiveNews,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to change user news receive', e);
    }
  }

  static async sendNotification({ role, subject, message }: ISendNotificationReq) {
    try {
      const response = await $authHost.post<ISendNotificationRes>('/users/send-notification', {
        role,
        message,
        subject,
      });

      return response.data;
    } catch (e) {
      console.log('Failed to notify users', e);
      throw e;
    }
  }

}
