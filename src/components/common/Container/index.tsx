import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  px?: 0 | 40 | 80 | 140;
}

export default function Container({
  children,
  className,
  px = 40,
}: Readonly<ContainerProps>) {
  return (
    <div
      style={{ paddingLeft: `${px}px`, paddingRight: `${px}px` }}
      className={cn(`mx-auto max-w-screen-2xl`, className)}
    >
      {children}
    </div>
  );
}
