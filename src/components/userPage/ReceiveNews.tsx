'use client';

import { FaRegNewspaper } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { NotificationsService } from '@/src/service/notificationsService';
import toast from 'react-hot-toast';

interface IReceiveNewsProps {
  receiveNews: boolean;
  userId: string;
}

export const ReceiveNews = ({ receiveNews: initialReceiveNews, userId }: IReceiveNewsProps) => {

  const [receiveNews, setReceiveNews] = useState<boolean>(initialReceiveNews);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeReceiveNews = async () => {
    setIsLoading(true);
    try {
      const response = await NotificationsService.changeUserReceiveNews({ userId, receiveNews: !receiveNews });
      if (response.statusCode) {
        toast.error('Something went wrong, try again later');
      }
      if (response._id) {
        setReceiveNews(prevState => !prevState);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <p>Receive news</p>
      <FaRegNewspaper /> :
      <input type='checkbox' checked={receiveNews} onChange={handleChangeReceiveNews} disabled={isLoading}
             className='w-5 h-5 border-2 border-amber-500  rounded-sm accent-amber-600  cursor-pointer' />
    </div>
  );
};

