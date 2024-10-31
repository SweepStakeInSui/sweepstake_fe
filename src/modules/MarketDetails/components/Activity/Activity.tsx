import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Empty from '@/components/common/Empty';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { ActivityItem } from '@/modules/Home/components/RecentActivity';
import { OrderService } from '@/services/orders';
import type { RecentActivityType } from '@/types/recentActivity';

interface ActivityProps {
  data: RecentActivityType[];
}
const Activity: React.FC<ActivityProps> = () => {
  const { ref, inView } = useInView();
  const params = useParams<{ id: string }>();
  const { data, fetchNextPage, isError, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ['activityMarket', params],
      queryFn: ({ pageParam = 1 }) =>
        OrderService.getOrder({
          page: pageParam,
          limit: 12,
          marketId: params.id,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.meta && lastPage.meta.itemCount < 12) return undefined;
        return pages.length + 1;
      },
      refetchInterval: 3000,
    },
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (isError || !data) {
    return <Empty content="No activity found" className="py-30" />;
  }
  const allAcitites = data.pages.flatMap((page) => page.items);
  return (
    <div>
      <Stack className="gap-4">
        {allAcitites.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
        <div ref={ref} className="h-10 mt-4">
          {isFetchingNextPage && (
            <Typography.Text>Loading more...</Typography.Text>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Activity;
