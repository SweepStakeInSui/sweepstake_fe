import React from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { cn } from '@/lib/utils';
import AvatarRank from '@/modules/Home/components/TopVolume/AvatarRank';
import { formatNumber } from '@/utils/formatNumber';
import { truncate } from '@/utils/truncate';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  avatar?: string;
  price: string;
  className?: string;
}

const LeaderboardItem = ({
  rank,
  username,
  avatar = 'https://github.com/shadcn.png',
  price,
  className,
}: Readonly<LeaderboardItemProps>) => {
  return (
    <Flex
      className={cn(
        'justify-between p-2 overflow-hidden rounded-sm transition-all duration-200 hover:bg-bg-hovered items-start cursor-pointer',
        className,
      )}
    >
      <Flex className="gap-4">
        <AvatarRank avatar={avatar} id={rank} />
        <Stack className="gap-y-px">
          <Typography.Text size={15} weight="bold" className="text-text">
            {truncate(username, 50)}
          </Typography.Text>
          <Flex>
            <Typography.Text size={13} className="text-text-subtle">
              {formatNumber.formatToUnit(price)} vol
            </Typography.Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LeaderboardItem;
