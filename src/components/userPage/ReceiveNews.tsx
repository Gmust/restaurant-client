'use client';

import { FaRegNewspaper } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

interface IReceiveNewsProps {
  receiveNews: boolean;
}

export const ReceiveNews = ({ receiveNews: initialReceiveNews }: IReceiveNewsProps) => {

  const [receiveNews, setReceiveNews] = useState<boolean>(initialReceiveNews);

  const handleChangeReceiveNews = async () => {
    try {
      setReceiveNews(prevState => !prevState);
    } catch (e) {

    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <p>Receive news</p>
      <FaRegNewspaper /> :
      <input type='checkbox' checked={receiveNews} onChange={handleChangeReceiveNews}
             className='w-5 h-5 border-2 border-amber-500  rounded-sm accent-amber-600   cursor-pointer' />
    </div>
  );
};

