import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center w-fit justify-center whitespace-nowrap rounded-md duration-500 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-btn-primary text-text-inverse hover:bg-btn-primary-hover active:bg-btn-primary-press',
        secondary:
          'bg-btn-secondary text-text-inverse hover:bg-btn-secondary-hover active:bg-btn-secondary-press',
        terriary:
          'border border-btn-terriary text-text-subtle hover:border-btn-terriary-hover active:border-btn-terriary-press ',
        ghost:
          'bg-transparent text-text-subtle hover:bg-btn-ghost-hover active:bg-btn-ghost-press',
        bet_yes:
          'bg-btn-betYes text-text-support-match hover:bg-btn-betYes-press hover:shadow-button-yes-shadow hover:text-wht-a100 active:bg-btn-betYes-hover active:text-text-support-match bg-opacity-35',
        bet_no:
          'bg-btn-betNo text-text-support-blue hover:bg-btn-betNo-hover hover:shadow-button-no-shadow  hover:text-white active:bg-btn-betNo-press active:text-text-support-blue',
        disable: 'bg-dyb-10 text-dyb-40 cursor-not-allowed',
        sub_btn: 'text-dyb-70 border border-dyb-20 hover:border-dyb-80',
        see_more:
          'text-btn-text hover:after:absolute hover:after:w-full hover:after:bg-btn-text hover:after:h-0.5 hover:after:bottom-0',
        see_more_red:
          'text-btn-text hover:after:absolute hover:after:w-full hover:after:bg-text-support-red hover:after:h-0.5 hover:after:bottom-0',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-12 px-4',
        lg: 'h-11 px-4',
        full: 'h-full w-full',
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
