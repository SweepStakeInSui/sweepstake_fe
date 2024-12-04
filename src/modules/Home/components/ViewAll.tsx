import Link from 'next/link';
import React from 'react';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewAllProps {
  link?: string;
  className?: string;
}
const ViewAll: React.FC<ViewAllProps> = ({ link, className }) => {
  return (
    <div className="relative">
      <Button variant="see_more" className={cn('p-0', className)}>
        <Flex className="gap-x-1">
          <Typography.Text
            className={cn('text-btn-text', className)}
            size={14}
            weight="semibold"
          >
            {link ? <Link href={link}>VIEW ALL</Link> : 'VIEW ALL'}
          </Typography.Text>
          <Svg src="/icons/arrow_forward_ios.svg" className="text-btn-text" />
        </Flex>
      </Button>
    </div>
  );
};

export default ViewAll;
