'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/common/Container';
import Empty from '@/components/common/Empty';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { OrderService } from '@/services/orders';

import { ActivityItem } from '../Home/components/RecentActivity';

const ActivityModule = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isError, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ['activityPage'],
      queryFn: ({ pageParam = 1 }) =>
        OrderService.getOrder({ page: pageParam, limit: 12 }),
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
    <Container className="max-w-screen-lg px-4 py-8 lg:py-10" size="sm">
      <Typography.Heading size={32} className="text-text lg:my-4">
        Recent Activity
      </Typography.Heading>
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
    </Container>
  );
};

export default ActivityModule;
