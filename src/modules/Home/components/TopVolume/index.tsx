import Flex from '@/components/common/Flex';
import { Icons } from '@/components/common/Icon';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { TopVolumeType } from '@/types/topVolume';

interface TopVolumeItemProps {
  username: string;
  avatar?: string;
  price: string;
}

function TopVolumeItem({
  username,
  avatar = 'https://github.com/shadcn.png',
  price,
}: Readonly<TopVolumeItemProps>) {
  return (
    <Flex className="cursor-default justify-between p-2 overflow-hidden rounded-sm transition-colors hover:bg-elevation-a200">
      <Flex className="gap-4">
        <Avatar isRounded={false}>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Stack className="gap-2">
          <p>{username}</p>
          <p className="text-elevation-a400 text-sm">{price}</p>
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
    <Stack className="gap-6">
      <Flex className="justify-between">
        <h3 className="text-2xl">Top Volume This Week</h3>
        <Button variant="primary" className="flex gap-1 px-6">
          See all
          <Icons.RightArrow />
        </Button>
      </Flex>
      <div className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <TopVolumeItem key={item.id} {...item} />
        ))}
      </div>
    </Stack>
  );
}
