import { cn } from '@/lib/utils';

interface FlexProps {
  children: any;
  className?: string;
}

export default function Flex({ children, className }: Readonly<FlexProps>) {
  return <div className={cn('flex', className)}>{children}</div>;
}
