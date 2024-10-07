import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

interface TabTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabVariants> {
  variant?: 'default' | 'selected';
  size?: 'default' | 'sm' | 'medium' | 'lg' | 'full' | 'icon';
}

const tabVariants = cva(
  'inline-flex items-center w-fit py-[6px] justify-center whitespace-nowrap rounded-md duration-500 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-tab-underline hover:underline hover:underline-offset-4',
        selected:
          'text-tab-underline-selected underline underline-offset-4 decoration-tab-underline-selected active:text-tab-underline-textPress active:decoration-tab-underline-textPress',
      },
      size: {
        default: 'py-[6px]',
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

const TabText: FC<TabTextProps> = ({
  variant,
  size,
  className,
  children,
  ...props
}) => {
  // Merge className with variant styles
  const computedClassName = cn(tabVariants({ variant, size }), className);

  return (
    <div className={computedClassName} {...props}>
      {children}
    </div>
  );
};

export default TabText;
