import { IFetchDishesResponse } from '@/@types/dishes';
import { Button } from '@/src/components/shared/Button';
import { cn } from '@/src/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';


type  IPaginatorProps = Pick<IFetchDishesResponse, 'pageTotal' | 'currentPage'> & {
  setCurrentPage: Dispatch<SetStateAction<number>>,
  createQueryString: (name: string, value: string) => string
}

export const Paginator = ({ pageTotal, currentPage, setCurrentPage, createQueryString }: IPaginatorProps) => {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className='flex flex-row justify-center space-x-4 mt-4'>
      {[...Array(pageTotal)].map((item, index) =>
        <Button
          variant='outlined'
          key={index}
          className={cn('active:scale-110', {
            'bg-amber-900': currentPage === index + 1,
          })}
          onClick={() => {
            router.push(pathname + '?' + createQueryString('skip', (index).toString()));
          }}
        >
          {index + 1}
        </Button>,
      )}
    </div>
  );
};

