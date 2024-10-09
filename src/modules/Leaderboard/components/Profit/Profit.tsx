import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';
import { TopVolumeItem } from '@/modules/Home/components/TopVolume';

import Wraper from '../Wraper';

const ProfitLeaderboard = () => {
  return (
    <Wraper>
      <Flex className="bg-pu-5 dark:bg-[rgba(155,1,245,0.08)] py-3 px-2">
        <Svg src="/icons/attach_money.svg" />
        <Typography.Heading className="text-text" size={20} weight="semibold">
          Profit
        </Typography.Heading>
      </Flex>
      {mockTopVolumeThisWeek.map((item) => (
        <TopVolumeItem key={item.id} {...item} className="py-3" />
      ))}
    </Wraper>
  );
};

export default ProfitLeaderboard;
