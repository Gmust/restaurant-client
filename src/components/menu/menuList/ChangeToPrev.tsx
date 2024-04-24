import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { IChangePageProps } from '@/src/components/menu/menuList/MenuList';
import { Button } from '@/src/components/shared/Button';


export const ChangeToPrev = ({ currentPage, createQueryString }: IChangePageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeToPrev = async () => {
    if (currentPage <= 1) {
      return;
    }
    router.push(pathname + '?' + createQueryString('skip', (currentPage - 2).toString()));
  };


  return (
    <div>
      <Button onClick={handleChangeToPrev}>
        <ArrowLeft />
      </Button>
    </div>
  );
};

