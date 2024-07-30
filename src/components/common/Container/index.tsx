import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  px?: 40 | 80 | 140;
}

export default function Container({
  children,
  className,
  px = 40,
}: Readonly<ContainerProps>) {
  return (
    <div className={cn(`px-${px / 4} mx-auto max-w-screen-2xl`, className)}>
      {children}
    </div>
  );
}
