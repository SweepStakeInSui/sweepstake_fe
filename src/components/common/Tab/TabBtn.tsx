import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const tabVariants = cva(
  'inline-flex items-center w-fit justify-center whitespace-nowrap rounded-md duration-500 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-bg-surface border border-borderMain text-text-subtle hover:border-tab-filled-bgHover active:bg-tab-filled-bgPress',
        selected:
          'bg-tab-filled-bgSelected text-text-inverse hover:bg-tab-filled-bgSelected active:bg-tab-filled-bgSelected',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-12 px-4',
        medium: 'h-10 px-4',
        lg: 'h-11 px-4',
        full: 'h-full w-full',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {
  asChild?: boolean;
}

const TabBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(tabVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
TabBtn.displayName = 'TabBtn';

export { TabBtn, tabVariants };
