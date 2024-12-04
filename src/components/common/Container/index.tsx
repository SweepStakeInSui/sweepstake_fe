import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  none: 'px-0',
  xs: 'px-5 sm:px-10',
  sm: 'px-5 sm:px-20',
  md: 'px-12',
  lg: 'px-16',
  xl: 'px-20',
  '2xl': 'px-24',
};
export default function Container({
  children,
  className,
  size = 'none',
}: Readonly<ContainerProps>) {
  return (
    <div className={cn(`container mx-auto ${sizeClasses[size]}`, className)}>
      {children}
    </div>
  );
}
