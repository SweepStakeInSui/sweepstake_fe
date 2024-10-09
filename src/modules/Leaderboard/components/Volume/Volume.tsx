import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';
import { TopVolumeItem } from '@/modules/Home/components/TopVolume';

import Wraper from '../Wraper';

const VolumeLeaderboard = () => {
  return (
    <Wraper>
      <Flex className="bg-org-5 dark:bg-bagde-warn py-3 px-2">
        <Svg src="/icons/bar_chart.svg" />
        <Typography.Heading className="text-text" size={20} weight="semibold">
          Volume
        </Typography.Heading>
      </Flex>
      {mockTopVolumeThisWeek.map((item) => (
        <TopVolumeItem key={item.id} {...item} className="py-3" />
      ))}
    </Wraper>
  );
};

export default VolumeLeaderboard;
