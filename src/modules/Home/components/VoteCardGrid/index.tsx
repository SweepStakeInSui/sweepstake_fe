import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { MarketService } from '@/services/markets';

import VoteCard from './VoteCard';

interface VoteCardGridProps {
  isForDisplay?: boolean;
}

const VoteCardGrid = ({ isForDisplay }: VoteCardGridProps) => {
  const [cate] = useQueryParam('category', withDefault(StringParam, ''));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['market-list', cate],
      queryFn: ({ pageParam = 1 }) =>
        MarketService.getMarket({
          page: pageParam,
          limit: 12,
          category: cate === 'All' ? '' : cate,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.meta && lastPage.data.meta.itemCount < 12)
          return undefined;
        return pages.length + 1;
      },
    });

  useEffect(() => {
    if (isForDisplay || !loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observerRef.current.observe(loadMoreRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isForDisplay, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError || !data || data.pages[0].data.items.length === 0) {
    return <Empty content="No market found" className="py-30" />;
  }

  const allMarkets = data.pages.flatMap((page) => page.data.items);
  const displayMarkets = isForDisplay ? allMarkets.slice(0, 12) : allMarkets;

  return (
    <div>
      <div className="grid grid-cols-autoFill w-full gap-4 py-5 lg:gap-6 lg:py-6">
        {displayMarkets.map((market) => (
          <VoteCard key={market.id} data={market} />
        ))}
      </div>
      {!isForDisplay && (
        <div ref={loadMoreRef} className="h-10 mt-4">
          {isFetchingNextPage && (
            <Typography.Text>Loading more...</Typography.Text>
          )}
        </div>
      )}
      {isForDisplay && (
        <Flex className="mt-3 mb-6 mx-auto gap-x-3 justify-center">
          <div className="relative">
            <Button variant="see_more_red" className="w-fit p-0">
              <Flex className="gap-x-1">
                <Link href="/markets" className="font-semibold">
                  <Typography.Text
                    className="flex items-center gap-x-1 text-text-subtle"
                    size={14}
                    weight="semibold"
                  >
                    See all {data.pages[0].data.meta?.totalItems} bets
                  </Typography.Text>
                </Link>
                <Svg src="/icons/arrow_forward_ios.svg" className="mt-1" />
              </Flex>
            </Button>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default VoteCardGrid;
