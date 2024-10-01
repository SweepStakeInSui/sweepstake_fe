'use client';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Badge } from '@/components/ui/badge';
import type { RecentActivityType } from '@/types/recentActivity';

import ViewAll from '../ViewAll';

export function ActivityItem({
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
    <Flex className="justify-between lg:p-2 flex-wrap overflow-hidden rounded-sm transition-all duration-200 hover:bg-bg-hovered items-start cursor-pointer">
      <Flex className="justify-between w-full items-start lg:items-center lg:flex-row ">
        <Flex className="gap-x-2 flex-1">
          <CustomAvatar src={avatar} />
          <Stack className="gap-1">
            <Flex className="gap-1 flex-wrap">
              <Flex className="gap-1">
                <Typography.Text size={15} weight="bold" className="text-text">
                  {username}
                </Typography.Text>
                <Typography.Text size={15} className="text-text">
                  bought
                </Typography.Text>
              </Flex>
              <Badge
                variant={`${bidding ? 'bet_yes' : 'bet_no'}`}
                className="line-clamp-1"
              >
                Yes {price} • {betname} • {contract} contracts
              </Badge>
            </Flex>
            <Typography.Text
              className="text-text-subtle line-clamp-1 lg:line-clamp-2"
              size={13}
            >
              {title}
            </Typography.Text>
          </Stack>
        </Flex>
        <Typography.Text
          size={13}
          className="text-text-subtle text-end lg:text-start w-full lg:w-[unset]"
        >
          {date}
        </Typography.Text>
      </Flex>
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
        <ViewAll link="/activity" />
      </Flex>
      {/* <RecentActivityItemSkeleton /> */}
      <Stack className="gap-4">
        {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}
