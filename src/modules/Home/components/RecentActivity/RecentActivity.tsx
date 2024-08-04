import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { RecentActivityType } from '@/types/recentActivity';

import ViewAll from '../ViewAll';

function ActivityItem({
  username,
  avatar = 'https://github.com/shadcn.png',
  title,
  bidding,
  date,
  price,
  betname,
  contract,
}: Readonly<RecentActivityType>) {
  return (
    <Flex className="justify-between p-2 overflow-hidden rounded-sm transition-all duration-200 hover:bg-bg-hovered items-start cursor-pointer">
      <Flex className="gap-x-2">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback />
        </Avatar>
        <Stack className="gap-px">
          <Flex className="gap-x-1">
            <Typography.Text size={15} weight="bold" className="text-text">
              {username}
            </Typography.Text>
            <Typography.Text size={15} className="text-text">
              bought
            </Typography.Text>
            {/* TODO */}
            <Flex>
              <span>Yes {price}¢</span>
              {bidding}
              <p>.</p>
              <span>{betname}</span>
              <span>.</span>
              <span>{contract}</span>
            </Flex>
          </Flex>
          <Typography.Text className="text-text-subtle" size={13}>
            {title}
          </Typography.Text>
        </Stack>
      </Flex>

      <Typography.Text size={13} className="text-text-subtle">
        {date}
      </Typography.Text>
    </Flex>
  );
}

interface RecentActivityProps {
  data: RecentActivityType[];
}

export default function RecentActivity({
  data,
}: Readonly<RecentActivityProps>) {
  return (
    <Stack className="gap-4 z-10">
      <Flex className="justify-between">
        <Typography.Heading size={24} weight="semibold">
          Recent Activity
        </Typography.Heading>
        <ViewAll link="/" />
      </Flex>
      <Stack className="gap-4">
        {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}
