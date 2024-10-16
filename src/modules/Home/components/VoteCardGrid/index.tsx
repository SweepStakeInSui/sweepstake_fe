import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { marketService } from '@/services/markets';

import VoteCard from './VoteCard';

const VoteCardGrid = () => {
  const [cate] = useQueryParam('category', withDefault(StringParam, ''));

  const { data: marketListData, isError } = useQuery({
    queryKey: ['market-list', cate],
    queryFn: async () =>
      marketService.getMarketService({ page: 1, limit: 12, category: cate }),
  });
  if (isError || marketListData?.items.length === 0) {
    return <Empty content="No market found" className="py-30" />;
  }
  return (
    <div>
      <div className="grid grid-cols-autoFill w-full gap-4 py-5 lg:gap-6 lg:py-6">
        {marketListData?.items.map((market) => (
          <VoteCard key={market.id} data={market} />
        ))}
      </div>
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
                  See all {marketListData?.items.length || 0} bets
                </Typography.Text>
              </Link>
              <Svg src="/icons/arrow_forward_ios.svg" className="mt-1" />
            </Flex>
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default VoteCardGrid;
