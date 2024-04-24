import { cva, VariantProps } from 'class-variance-authority';
import { IconNode } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/src/lib/utils';


const inputVariants = cva('bg-gray-50 border border-gray-300 text-gray-900 text-md block w-full p-2 ', {
  variants: {
    variant: {
      default: '',
      rounded: 'rounded-lg',
    },
    size: {
      md: 'h-10 py-2 px-4 text-md',
      sm: 'h-6 py-2 px-2 text-sm',
      lg: 'h-20 py-4 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});


interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  isLoading?: boolean,
  Icon?: IconNode | IconType
}

// eslint-disable-next-line react/display-name
export const CustomInput = forwardRef(({ Icon, isLoading, variant, size, className, ...props }: IInputProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <>
      {
        Icon ?
          <div className='flex'>
             <span
               className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
            {
              // @ts-ignore
              <Icon />
            }
             </span>
            <input
              className={`${cn(inputVariants({ className, size, variant }))} rounded-r-lg`} disabled={isLoading}
              {...props} ref={ref} />
          </div>
          : <input
            className={cn(inputVariants({ className, size, variant }))} disabled={isLoading}
            {...props} ref={ref} />
      }
    </>
  );
});
