import { cva, VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/src/lib/utils';

export const buttonVariants = cva(
  'active:scale-95 inline-flex justify-center items-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-amber-700 text-white hover:bg-amber-800',
        ghost: 'bg-transparent  hover:text-white  hover:bg-amber-800',
        outlined: 'bg-inherit border-2 border-amber-700  hover:scale-95 hover:border-amber-800 transition duration-300',
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
  },
);


interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = ({ className, children, variant, isLoading, size, ...props }: IButtonProps) =>
  <button className={cn(buttonVariants({ className, size, variant }))} disabled={isLoading} {...props}>
    {isLoading ? <Loader className='animate-spin mr-2 h-4 w-4' /> : null}
    {children}
  </button>;

