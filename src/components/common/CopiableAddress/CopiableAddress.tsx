'use client';

import React from 'react';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Svg from '@/components/common/Svg';
import type { TypographyTextSize } from '@/components/common/Typography';
import Typography from '@/components/common/Typography';
import { Tooltip } from '@/components/ui/tooltip';

interface ICopiableAddress {
  address: string | React.ReactNode;
  size?: TypographyTextSize;
  className?: string;
}

const CopiableAddress = ({
  address,
  size = 15,
  className,
}: ICopiableAddress) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    navigator.clipboard.writeText(address as string);
    setIsCopied(true);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Flex className={className}>
      <div className="min-w-0 flex-1 lg:flex-none">
        <Typography.Text size={size} className="truncate">
          {address}
        </Typography.Text>
      </div>
      <Tooltip content={isCopied ? 'Copied' : 'Copy'}>
        <div className="inline-block">
          <IconButton onClick={handleCopy}>
            <Svg src="/icons/copy.svg" />
          </IconButton>
        </div>
      </Tooltip>
    </Flex>
  );
};

export default CopiableAddress;
