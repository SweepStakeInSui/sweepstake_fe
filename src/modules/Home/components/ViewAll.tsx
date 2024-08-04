import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
interface ViewAllProps {
  link: string;
}
const ViewAll: React.FC<ViewAllProps> = ({ link }) => {
  return (
    <div className="relative">
      <Button variant={'see_more'} className="p-0">
        <Flex className="gap-x-1">
          <Typography.Text
            className="text-btn-text"
            size={14}
            weight="semibold"
          >
            <Link href={link}>VIEW ALL</Link>
          </Typography.Text>
          <Svg src="/icons/arrow_forward_ios.svg" className="text-btn-text" />
        </Flex>
      </Button>
    </div>
  );
};

export default ViewAll;
