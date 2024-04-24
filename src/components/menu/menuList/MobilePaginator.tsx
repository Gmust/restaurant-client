import { Dispatch, SetStateAction } from 'react';

import { IFetchDishesResponse } from '@/@types/dishes';
import { ChangeToNext } from '@/src/components/menu/menuList/ChangeToNext';
import { ChangeToPrev } from '@/src/components/menu/menuList/ChangeToPrev';
import { Paginator } from '@/src/components/menu/menuList/Paginator';

type  IMobilePaginator = Pick<IFetchDishesResponse, 'pageTotal' | 'currentPage'> & {
  setCurrentPage: Dispatch<SetStateAction<number>>,
  createQueryString: (name: string, value: string) => string
}

export const MobilePaginator = ({ currentPage, setCurrentPage, createQueryString, pageTotal }: IMobilePaginator) => {
  return (
    <div className='flex justify-between items-center mx-4'>
      <ChangeToPrev currentPage={currentPage} createQueryString={createQueryString} pageTotal={pageTotal} />
      <Paginator setCurrentPage={setCurrentPage} createQueryString={createQueryString} pageTotal={pageTotal}
                 currentPage={currentPage} />
      <ChangeToNext currentPage={currentPage} createQueryString={createQueryString} pageTotal={pageTotal} />
    </div>
  );
};

