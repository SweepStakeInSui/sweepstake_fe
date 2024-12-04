import React from 'react';

import { cn } from '@/lib/utils';

import s from './style.module.scss';

interface ITag
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function Tag({ children, className, ...props }: Readonly<ITag>) {
  return (
    <div {...props} className={cn(s.container, className)}>
      {children}
    </div>
  );
}
