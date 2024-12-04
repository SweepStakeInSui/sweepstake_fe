'use client';

import React from 'react';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Svg from '@/components/common/Svg';
import type { TypographyTextSize } from '@/components/common/Typography';
import Typography from '@/components/common/Typography';
import { Tooltip } from '@/components/ui/tooltip';

interface ICopyButton {
  address?: string | React.ReactNode;
  content?: string;
  tooltipContent?: string;
  size?: TypographyTextSize;
  className?: string;
  iconClassName?: string;
  icon?: React.ReactNode;
}

const CopyButton = ({
  address,
  content,
  tooltipContent = 'Copy',
  size = 15,
  className,
  iconClassName,
  icon = <Svg src="/icons/copy.svg" />,
}: ICopyButton) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    navigator.clipboard.writeText((address as string) || (content as string));
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
      <Tooltip content={isCopied ? 'Copied' : tooltipContent}>
        <div className="inline-block">
          <IconButton
            onClick={handleCopy}
            isRounded
            variant="ghost"
            className={iconClassName}
          >
            {icon}
          </IconButton>
        </div>
      </Tooltip>
    </Flex>
  );
};

export default CopyButton;
