import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-a800 text-white hover:bg-primary-a600 active:bg-primary-a500',
        secondary_light:
          'bg-elevation-a200 text-elevation-a700 hover:bg-elevation-a400 active:bg-elevation-a500',
        secondary_mid:
          'bg-elevation-a300 text-elevation-a700 hover:bg-elevation-a400 active:bg-elevation-a500',
        secondary_dark:
          'bg-elevation-a800 text-elevation-a50 hover:bg-elevation-a600 active:bg-elevation-a500',
        light_outline:
          'bg-elevation-a700 bg-opacity-25 text-elevation-a700 hover:border-elevation-a700 hover:bg-opacity-0 active:border-elevation-a700 active:bg-opacity-50 border border-elevation-a700 border-opacity-25',
        accent_red:
          'bg-secondary-red-a400 bg-opacity-25 text-secondary-red-a400 hover:bg-secondary-red-a100 hover:bg-secondary-red-a400 active:text-white hover:text-white active:bg-secondary-red-a200',
        accent_green:
          'bg-secondary-green-a400 bg-opacity-25 text-secondary-green-a400 hover:bg-secondary-a100 hover:bg-secondary-green-a100 active:text-white hover:text-white active:bg-secondary-green-a300',
        ghost:
          'bg-transparent hover:bg-bg-elevation-a200 active:bg-elevation-a200',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
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
