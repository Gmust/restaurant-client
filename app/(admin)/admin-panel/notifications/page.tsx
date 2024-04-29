import { Metadata } from 'next';

import { NotificationForm } from '@/src/components/adminPanel/notifications/NotificationForm';

export const metadata: Metadata = {
  title: 'Notification Menu',
  description: 'Notification Menu',
};


const NotificationsPage = () => {

  return (
    <div className='text-black flex flex-col justify-center items-center text-2xl mt-2'>
      <h1 className='text-3xl font-semibold'>Create new notification:</h1>
      <NotificationForm />
    </div>
  );
};

export default NotificationsPage;
