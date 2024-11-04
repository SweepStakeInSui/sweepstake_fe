import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

import Wraper from '../Wraper';
import { LeaderboardServices } from '@/services/leaderboard';
import { useQuery } from '@tanstack/react-query';
import { LeaderboardItem } from '@/modules/Leaderboard/components/LeaderboardItem';

const VolumeLeaderboard = () => {
  const { data: volumeLeaderboardData } = useQuery({
    queryKey: ['volume-leaderboard'],
    queryFn: async () =>
      LeaderboardServices.getLeaderboardVolume({
        page: 1,
        limit: 10,
      }),
  });
  return (
    <Wraper>
      <Flex className="bg-org-5 dark:bg-bagde-warn py-3 px-2">
        <Svg src="/icons/bar_chart.svg" />
        <Typography.Heading className="text-text" size={20} weight="semibold">
          Volume
        </Typography.Heading>
      </Flex>
      {volumeLeaderboardData?.data?.items?.map((item, index) => (
        <LeaderboardItem
          key={item.id}
          username={item.username || item.address}
          avatar={item.avatar}
          price={item.volume}
          rank={index + 1}
          className="py-3"
        />
      ))}
    </Wraper>
  );
};

export default VolumeLeaderboard;
