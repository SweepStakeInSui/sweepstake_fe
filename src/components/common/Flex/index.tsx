import { cn } from '@/lib/utils';

interface FlexProps {
  children: React.ReactNode;
  className?: string;
}

export default function Flex({ children, className }: Readonly<FlexProps>) {
  return (
    <div className={cn('flex gap-2 items-center', className)}>{children}</div>
  );
}
