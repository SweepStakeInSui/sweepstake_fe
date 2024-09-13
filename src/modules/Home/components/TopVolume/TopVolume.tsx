import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { cn } from '@/lib/utils';
import type { TopVolumeType } from '@/types/topVolume';

import ViewAll from '../ViewAll';
import AvatarRank from './AvatarRank';

interface TopVolumeItemProps {
  id: number;
  username: string;
  avatar?: string;
  price: string;
  className?: string;
}

export function TopVolumeItem({
  id,
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
        <AvatarRank avatar={avatar} id={id} />
        <Stack className="gap-y-px">
          <Typography.Text size={15} weight="bold" className="text-text">
            {username}
          </Typography.Text>
          <Flex className="text-text-subtle">
            <Typography.Text size={13}>{price}</Typography.Text>
            <span>.</span>
            <Typography.Text size={13}>12k trades</Typography.Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

interface TopVolumeProps {
  data: TopVolumeType[];
}

export default function TopVolume({ data }: Readonly<TopVolumeProps>) {
  return (
    <Stack className="gap-4 z-10">
      <Flex className="justify-between">
        <Typography.Heading size={24} weight="semibold">
          Top Volume This Week
        </Typography.Heading>
        <ViewAll link="/" />
      </Flex>
      <div className="grid grid-rows-10 lg:grid-rows-5 grid-flow-col gap-4">
        {data.map((item) => (
          <TopVolumeItem key={item.id} {...item} />
        ))}
      </div>
    </Stack>
  );
}
