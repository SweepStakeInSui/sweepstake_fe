import Image from 'next/image';

import { cn } from '@/lib/utils';

import Stack from '../Stack';
import Typography from '../Typography';

interface EmptyProps {
  content: string;
  className?: string;
}

const Empty: React.FC<EmptyProps> = ({ content, className }) => {
  return (
    <Stack className={cn('items-center py-10 pb-5', className)}>
      <Image
        src="/images/coinSweepstake.png"
        width={80}
        height={80}
        alt="coin"
      />
      <Typography.Text className="text-text-sublest">{content}</Typography.Text>
    </Stack>
  );
};

export default Empty;
