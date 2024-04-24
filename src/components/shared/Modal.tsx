import { Dispatch, SetStateAction, useEffect } from 'react';

import { cn } from '@/src/lib/utils';


interface IModalProps {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  children: any
}

export const Modal = ({ isActive, setIsActive, children }: IModalProps) => {

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === 'Escape') {
        setIsActive(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () =>
      document.removeEventListener('keydown', handleEscape);
  }, [isActive]);

  return (
    <div
      className={cn('h-full w-full z-10 fixed top-0 left-0 flex bg-[#00000066] items-center justify-center opacity-0 transition duration-500 pointer-events-none', {
        'opacity-100 pointer-events-auto': isActive,
      })}
      onClick={() => setIsActive(!isActive)}
    >
      <div
        className={cn('p-[20px] rounded-md bg-white text-black  transform scale-50 transition-all duration-500 text-xl', {
          'scale-100': isActive,
        })} onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

