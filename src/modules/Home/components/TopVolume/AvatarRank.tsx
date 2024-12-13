'use client';

import React from 'react';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';

interface AvatarRankProps {
  id: number;
  avatar?: string;
}
const medalIcons: Record<number, string> = {
  1: '/icons/Medal.svg',
  2: '/icons/Medal-1.svg',
  3: '/icons/Medal-2.svg',
};
const AvatarRank: React.FC<AvatarRankProps> = ({ id, avatar }) => {
  const iconSrc = medalIcons[id];
  return (
    <div className="relative">
      <CustomAvatar src={avatar} />
      <div className="absolute -top-[6px] -right-[6px]">
        {iconSrc ? (
          <Svg src={iconSrc} />
        ) : (
          <Flex className="bg-blk-a80 size-5 justify-center text-white rounded-full">
            <p className="text-[11px] font-semibold">{id}</p>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default AvatarRank;
