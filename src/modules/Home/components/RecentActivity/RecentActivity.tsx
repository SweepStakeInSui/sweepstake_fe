import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { RecentActivityType } from '@/types/recentActivity';

interface ActivityItemProps {
  username: string;
  avatar?: string;
  title: string;
  bidding: boolean;
  date: string;
  price: string;
}

function ActivityItem({
  username,
  avatar = 'https://github.com/shadcn.png',
  title,
  bidding,
  date,
  price,
}: Readonly<ActivityItemProps>) {
  return (
    <Flex className="cursor-default justify-between p-2 overflow-hidden rounded-sm transition-colors hover:bg-elevation-a200">
      <Flex className="gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback />
        </Avatar>
        <Stack className="gap-2">
          <p className="text-elevation-a400">{title}</p>
          <Flex>
            <div>
              <Avatar size="sm" isRounded={false}>
                <AvatarImage src={avatar} />
                <AvatarFallback />
              </Avatar>
            </div>
            <p className="text-sm">
              {username} bought
              <span
                className={
                  bidding
                    ? 'text-secondary-green-a400'
                    : 'text-secondary-red-a400'
                }
              >
                {bidding ? 'Yes' : 'No'}
              </span>
              at {price}
            </p>
          </Flex>
        </Stack>
      </Flex>

      <p className="text-sm">{date}</p>
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
    <Stack className="gap-6">
      <Flex className="justify-between">
        <h3 className="text-2xl">Recent Activity</h3>
        <Button variant="primary" className="flex gap-1 px-6">
          See all
        </Button>
      </Flex>
      <Stack className="gap-2">
        {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}
