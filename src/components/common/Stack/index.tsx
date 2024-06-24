import { cn } from '@/lib/utils';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  justifyCenter?: boolean;
}

export default function Stack({ children, className }: Readonly<StackProps>) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}
