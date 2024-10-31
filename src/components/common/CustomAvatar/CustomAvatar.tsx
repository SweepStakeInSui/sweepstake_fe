import { cva } from 'class-variance-authority';
import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ICustomAvatar {
  src?: string;
  address?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'size2xl';
  isRounded?: boolean;
  className?: string;
}

const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    size: {
      sm: 'h-5 w-5',
      md: 'h-11 w-11',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20',
      size2xl: 'size-32',
    },
    isRounded: {
      true: 'rounded-full',
      false: 'rounded-sm',
    },
  },
});

const sizeMapping = {
  sm: 20,
  md: 44,
  lg: 64,
  xl: 80,
  size2xl: 128,
};

const CustomAvatar = ({
  src,
  address,
  size = 'md',
  className,
  isRounded = true,
}: ICustomAvatar) => {
  return (
    <div className={`${className}`}>
      {src ? (
        <Avatar size={size} isRounded={isRounded}>
          <AvatarImage src={src} className="object-cover" />
          <AvatarFallback className="bg-bg-sublest" />
        </Avatar>
      ) : (
        <div className={cn(avatarVariants({ size, isRounded }))}>
          <Jazzicon
            seed={jsNumberForAddress(address || '')}
            diameter={sizeMapping[size]}
          />
        </div>
      )}
    </div>
  );
};

export default CustomAvatar;
