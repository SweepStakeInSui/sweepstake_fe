import { useQuery } from '@tanstack/react-query';

import Flex from '@/components/common/Flex';
import { RankingItem } from '@/components/common/RankingItem';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { LeaderboardServices } from '@/services/leaderboard';

import ViewAll from '../ViewAll';

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
          <RankingItem
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
