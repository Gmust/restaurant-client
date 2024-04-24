import { ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { IChangePageProps } from '@/src/components/menu/menuList/MenuList';
import { Button } from '@/src/components/shared/Button';

export const ChangeToNext = ({ currentPage, createQueryString, pageTotal }: IChangePageProps) => {

  const router = useRouter();
  const pathname = usePathname();

  const handleChangeToNext = async () => {
    if (currentPage >= pageTotal!) {
      return;
    }
    router.push(pathname + '?' + createQueryString('skip', (currentPage).toString()));
  };

  return (
    <div>
      <Button onClick={handleChangeToNext}>
        <ArrowRight />
      </Button>
    </div>
  );
};

