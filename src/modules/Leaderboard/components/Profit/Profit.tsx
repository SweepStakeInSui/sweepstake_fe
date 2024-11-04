import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

import Wraper from '../Wraper';
import { useQuery } from '@tanstack/react-query';
import { LeaderboardServices } from '@/services/leaderboard';
import { LeaderboardItem } from '@/modules/Leaderboard/components/LeaderboardItem';

const ProfitLeaderboard = () => {
  const { data: profitLeaderboardData } = useQuery({
    queryKey: ['profit-leaderboard'],
    queryFn: async () =>
      LeaderboardServices.getLeaderboardProfit({
        page: 1,
        limit: 10,
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
      {profitLeaderboardData?.data?.items?.map((item, index) => (
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

export default ProfitLeaderboard;
