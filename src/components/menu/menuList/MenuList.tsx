'use client';

import { IFetchDishesResponse } from '@/@types/dishes';
import { Button } from '@/src/components/shared/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { DishesService } from '@/src/service/dishesService';
import { DishCard } from '@/src/components/shared/DishCard';
import { Paginator } from '@/src/components/menu/menuList/Paginator';
import { MenuSkeleton } from '@/src/components/loaders/MenuSkeleton';

interface IMenuListProps {
  initialMenu: IFetchDishesResponse;
}

export const MenuList = ({ initialMenu }: IMenuListProps) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [menu, setMenu] = useState<IFetchDishesResponse>(initialMenu);
  const [currentPage, setCurrentPage] = useState<number>(initialMenu.currentPage);
  const [totalPages, setTotalPages] = useState<number>(initialMenu.currentPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);


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

  const handleChangeToPrev = async () => {
    if (currentPage <= 1) {
      return;
    }
    router.push(pathname + '?' + createQueryString('skip', (currentPage - 2).toString()));
  };

  const handleChangeToNext = async () => {
    if (currentPage >= initialMenu.pageTotal) {
      return;
    }
    router.push(pathname + '?' + createQueryString('skip', (currentPage).toString()));
  };

  return (
    <div className='animate-fadeInBottom flex flex-col'>
      <div className='flex flex-row justify-around items-center mx-24'>
        <div>
          <Button onClick={handleChangeToPrev}>
            <ArrowLeft />
          </Button>
        </div>
        {
          isLoading ? <MenuSkeleton itemsAmount={6} /> : menu.data.length > 0 ?
            <div className='grid grid-cols-2 align-middle justify-items-center gap-12 mx-8'>
              {menu.data.map(dish => <DishCard {...dish} key={dish._id} />)}
            </div>
            :
            <div className='flex justify-center items-center  mx-8'>
              Unable to find dishes with the following filters
            </div>
        }
        <div>
          <Button onClick={handleChangeToNext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pageTotal={totalPages}
                 createQueryString={createQueryString} />
    </div>
  );
};


