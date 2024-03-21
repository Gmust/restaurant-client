import { Button } from '@/src/components/shared/Button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IChangePageProps } from '@/src/components/menu/menuList/MenuList';


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

