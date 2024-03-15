import { IChangeReceiveNewsErrorRes, IChangeReceiveNewsReq } from '@/@types/notifications';
import { IUser } from '@/@types/user';


export class NotificationsService {

  static async changeUserReceiveNews({ userId, receiveNews, token }: IChangeReceiveNewsReq) {
    try {
      const data = JSON.stringify({ userId, receiveNews });

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/users/change-receive-news`, {
        method: 'PATCH',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (e) {
      console.error('Failed to change user news receive', e);
    }
  }


}
