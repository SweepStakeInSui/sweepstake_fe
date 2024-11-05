import { useQuery } from '@tanstack/react-query';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { cn } from '@/lib/utils';
import { LeaderboardServices } from '@/services/leaderboard';
import { formatNumber } from '@/utils/formatNumber';
import { handleBignumber } from '@/utils/handleBignumber';
import { truncate } from '@/utils/truncate';

import ViewAll from '../ViewAll';
import AvatarRank from './AvatarRank';

interface TopVolumeItemProps {
  rank: number;
  username: string;
  avatar?: string;
  price: string;
  className?: string;
}

export function TopVolumeItem({
  rank,
  username,
  avatar = 'https://github.com/shadcn.png',
  price,
  className,
}: Readonly<TopVolumeItemProps>) {
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
              {formatNumber.formatToUnit(handleBignumber.divideDecimal(price))}{' '}
              vol
            </Typography.Text>
            {/* <Typography.Text size={13} className="text-text-subtle">
              12k trades
            </Typography.Text> */}
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default function TopVolume() {
  const { data: volumeLeaderboardData } = useQuery({
    queryKey: ['volume-leaderboard'],
    queryFn: async () =>
      LeaderboardServices.getLeaderboardVolume({
        page: 1,
        limit: 10,
      }),
  });

  return (
    <Stack className="gap-4 z-10">
      <Flex className="justify-between">
        <Typography.Heading size={24} weight="semibold">
          Leaderboard
        </Typography.Heading>
        <ViewAll link="/leaderboard" />
      </Flex>
      <div className="grid grid-rows-10 lg:grid-rows-5 grid-flow-col gap-4">
        {volumeLeaderboardData?.data?.items?.map((item, index) => (
          <TopVolumeItem
            key={item.id}
            username={item.username || item.address}
            avatar={item.avatar}
            price={item.volume}
            rank={index + 1}
          />
        ))}
      </div>
    </Stack>
  );
}
