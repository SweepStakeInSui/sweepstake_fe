import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: Readonly<ContainerProps>) {
  return (
    <div className={cn('container mx-auto max-w-screen-2xl', className)}>
      {children}
    </div>
  );
}
