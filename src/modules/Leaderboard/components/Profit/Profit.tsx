import { useQuery } from '@tanstack/react-query';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import { RankingItem } from '@/components/common/RankingItem';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { LeaderboardServices } from '@/services/leaderboard';

import Wraper from '../Wraper';

interface ProfitLeaderboardProps {
  period: string;
}
const ProfitLeaderboard: React.FC<ProfitLeaderboardProps> = ({ period }) => {
  const { data: profitLeaderboardData } = useQuery({
    queryKey: ['profit-leaderboard', period],
    queryFn: async () =>
      LeaderboardServices.getLeaderboardProfit({
        page: 1,
        limit: 10,
        period,
      }),
  });
  return (
    <Wraper>
      <Flex className="bg-pu-5 dark:bg-[rgba(155,1,245,0.08)] py-3 px-2">
        <Svg src="/icons/attach_money.svg" />
        <Typography.Heading className="text-text" size={20} weight="semibold">
          Profit
        </Typography.Heading>
      </Flex>
      {profitLeaderboardData?.data.length === 0 ? (
        <Empty content="No profit data available" />
      ) : (
        profitLeaderboardData?.data?.map((item, index) => (
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

export default ProfitLeaderboard;
