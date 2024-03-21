import { IChangeReceiveNewsErrorRes, IChangeReceiveNewsReq } from '@/@types/notifications';
import { IUser } from '@/@types/user';
import { $authHost } from '@/src/service/index';


export class NotificationsService {

  static async changeUserReceiveNews({ userId, receiveNews }: IChangeReceiveNewsReq) {
    try {
      // const data = JSON.stringify({ userId, receiveNews });
      //
      // const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/users/change-receive-news`, {
      //   method: 'PATCH',
      //   body: data,
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      //
      // return await response.json();

      const response = await $authHost.patch(`/users/change-receive-news`, {
        userId,
        receiveNews,
      });

      return response.data;
    } catch (e) {
      console.error('Failed to change user news receive', e);
    }
  }


}
