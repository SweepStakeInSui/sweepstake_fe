import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
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
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="absolute -top-[6px] -right-[6px]">
        {iconSrc ? (
          <Svg src={iconSrc} />
        ) : (
          <Flex className="bg-blk-a80 size-5 justify-center text-text-inverse rounded-full">
            {/* <Typography.Text size={12} weight="semibold">
              {id}
            </Typography.Text> */}
            <p className="text-[11px] font-semibold">{id}</p>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default AvatarRank;
