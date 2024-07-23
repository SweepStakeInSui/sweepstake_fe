import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center w-fit justify-center whitespace-nowrap rounded-sm duration-500 text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-r-50 text-white hover:bg-r-60 active:bg-r-70',
        secondary: 'bg-dyb-95 text-white hover:bg-dyb-85 active:bg-dyb-60',
        ghost: 'bg-transparent text-dyb-70 hover:bg-dyb-5 active:bg-dyb-10',
        bet_yes:
          'bg-r-5 text-r-50 active:bg-r-10 active:text-r-50 hover:bg-r-50 hover:text-white',
        bet_no:
          'bg-dyb-5 text-dyb-95 hover:bg-dyb-90 hover:text-white active:bg-dyb-5 active:text-dyb-95',
        disable: 'bg-dyb-10 text-dyb-40 cursor-not-allowed',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-12 rounded-md px-4',
        lg: 'h-11 rounded-md px-4',
        full: 'h-full rounded-md w-full',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
