import { useQuery } from '@tanstack/react-query';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import { RankingItem } from '@/components/common/RankingItem';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { LeaderboardServices } from '@/services/leaderboard';

import Wraper from '../Wraper';

interface VolumeLeaderboardProps {
  period: string;
}
const VolumeLeaderboard: React.FC<VolumeLeaderboardProps> = ({ period }) => {
  const { data: volumeLeaderboardData } = useQuery({
    queryKey: ['volume-leaderboard', period],
    queryFn: async () =>
      LeaderboardServices.getLeaderboardVolume({
        page: 1,
        limit: 10,
        period,
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
      {volumeLeaderboardData?.data.length === 0 ? (
        <Empty content="No volume data available" />
      ) : (
        volumeLeaderboardData?.data?.map((item, index) => (
          <RankingItem
            key={item.id}
            username={item.username || item.address}
            avatar={item.avatar}
            price={item.volume}
            rank={index + 1}
            className="py-3"
          />
        ))
      )}
    </Wraper>
  );
};

export default VolumeLeaderboard;
