'use client';


import { notFound, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/src/store/user-store';
import { AuthService } from '@/src/service/authService';
import { socket } from '@/src/utils/socket';
import { io } from 'socket.io-client';

const FullInfoOrderPage = () => {

  const { user, isAuth, actions } = useUserStore();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      notFound();
    }

    const socket = io(process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL!, {
      extraHeaders: {
        'id': user?._id!,
      },
    });


    socket.on('update-order-status', (data: any) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };

  }, [user]);
  const pathname = usePathname();

  return (
    <div>

    </div>
  );
};

export default FullInfoOrderPage;
