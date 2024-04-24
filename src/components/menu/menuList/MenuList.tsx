'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { IFetchDishesResponse } from '@/@types/dishes';
import { MenuSkeleton } from '@/src/components/loaders/MenuSkeleton';
import { ChangeToNext } from '@/src/components/menu/menuList/ChangeToNext';
import { ChangeToPrev } from '@/src/components/menu/menuList/ChangeToPrev';
import { MobilePaginator } from '@/src/components/menu/menuList/MobilePaginator';
import { Paginator } from '@/src/components/menu/menuList/Paginator';
import { Button } from '@/src/components/shared/Button';
import { DishCard } from '@/src/components/shared/DishCard';
import { useScreenSize } from '@/src/hooks/screen-size-hook';
import { DishesService } from '@/src/service/dishesService';

interface IMenuListProps {
  initialMenu: IFetchDishesResponse;
}

export interface IChangePageProps {
  currentPage: number,
  createQueryString: (name: string, value: string) => string,
  pageTotal?: number
}

export const MenuList = ({ initialMenu }: IMenuListProps) => {

  const searchParams = useSearchParams();

  const [menu, setMenu] = useState<IFetchDishesResponse>(initialMenu);
  const [currentPage, setCurrentPage] = useState<number>(initialMenu.currentPage);
  const [totalPages, setTotalPages] = useState<number>(initialMenu.currentPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width } = useScreenSize();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );


  useEffect(() => {
    const fetchAnotherPage = async () => {
      setIsLoading(true);
      try {
        const menuResponse = await DishesService.fetchDishes({ queryParams: `${searchParams.toString()}&limit=6` });
        setTotalPages(menuResponse.pageTotal);
        setCurrentPage(menuResponse.currentPage);
        setMenu(menuResponse);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnotherPage();
  }, [searchParams]);


  return (
    <div className='animate-fadeInBottom flex flex-col'>
      <div className='flex flex-row justify-around items-center mx-24'>
        {
          width > 780 ?
            <ChangeToPrev currentPage={currentPage} createQueryString={createQueryString} pageTotal={totalPages} />
            : null
        }
        {
          isLoading ? <MenuSkeleton itemsAmount={6} /> : menu.data.length > 0 ?
            <div className='grid grid-cols-1 md:grid-cols-2 align-middle justify-items-center gap-6 md:gap-12 md:mx-8'>
              {menu.data.map(dish => <DishCard {...dish} key={dish._id} />)}
            </div>
            :
            <div className='flex justify-center items-center  mx-8'>
              Unable to find dishes with the following filters
            </div>
        }
        {
          width > 780 ?
            <ChangeToNext currentPage={currentPage} createQueryString={createQueryString}
                          pageTotal={totalPages} />
            : null
        }
      </div>
      {
        width > 780 ?
          <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pageTotal={totalPages}
                     createQueryString={createQueryString} />
          :
          <MobilePaginator createQueryString={createQueryString} pageTotal={totalPages} setCurrentPage={setCurrentPage}
                           currentPage={currentPage} />
      }

    </div>
  );
};


