'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Badge } from '@/components/ui/badge';
import { OrderService } from '@/services/orders';
import type { IActivityItem } from '@/types/table';
import { formatDate } from '@/utils/formatDate';
import { handleBignumber } from '@/utils/handleBignumber';

import ViewAll from '../ViewAll';
import Link from 'next/link';

interface ActivityItemProps {
  item: IActivityItem;
}
export function ActivityItem({ item }: Readonly<ActivityItemProps>) {
  return (
    <Link href={`/markets/${item.marketId}`}>
      <Flex className="justify-between lg:p-2 flex-wrap overflow-hidden rounded-sm transition-all duration-200 hover:bg-bg-hovered items-start cursor-pointer">
        <Flex className="justify-between w-full items-start lg:items-center lg:flex-row ">
          <Flex className="gap-x-2 flex-1">
            <CustomAvatar src={item.image} />
            <Stack className="gap-1">
              <Flex className="gap-1 flex-wrap">
                <Flex className="gap-1">
                  <Typography.Text
                    size={15}
                    weight="bold"
                    className="text-text"
                  >
                    {/* {item.userId} */}
                    Unnamed
                  </Typography.Text>
                  <Typography.Text size={15} className="text-text">
                    bought
                  </Typography.Text>
                </Flex>
                <Badge
                  variant={`${item.outcome.type === 'Yes' ? 'bet_yes' : 'bet_no'}`}
                  className="line-clamp-1"
                >
                  {item.outcome.type}{' '}
                  {handleBignumber.divideDecimal(item.outcome.bidPrice)} •
                  Unnamed • {item.amount} contracts
                </Badge>
              </Flex>
              <Typography.Text
                className="text-text-subtle line-clamp-1 lg:line-clamp-2"
                size={13}
              >
                {item.outcome.market.name}
              </Typography.Text>
            </Stack>
          </Flex>
          <Typography.Text
            size={13}
            className="text-text-subtle text-end lg:text-start w-full lg:w-[unset]"
          >
            {formatDate.formatTimeAgo(item.timestamp)}
          </Typography.Text>
        </Flex>
      </Flex>
    </Link>
  );
}

export default function RecentActivity() {
  const { data } = useSuspenseQuery({
    queryKey: ['activity'],
    queryFn: async () => {
      const result = await OrderService.getOrder({
        page: 1,
        limit: 5,
      });
      return result;
    },
    refetchInterval: 3000,
  });
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
        {data.items.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </Stack>
    </Stack>
  );
}
