import Link from 'next/link';
import React from 'react';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import type { TBetItem } from '@/services/markets/types';

import VoteCard from './VoteCard';

interface VoteCardGridProps {
  data?: TBetItem[];
}

const VoteCardGrid = ({ data }: VoteCardGridProps) => {
  return (
    <div>
      <div className="grid grid-cols-autoFill w-full gap-4 py-5 lg:gap-6 lg:py-6">
        {data?.map((market) => <VoteCard key={market.id} data={market} />)}
      </div>
      <Flex className="mt-3 mb-6 mx-auto gap-x-3 justify-center">
        <div className="relative">
          <Button variant="see_more_red" className="w-fit p-0">
            <Flex className="gap-x-1">
              <Link href="/" className="font-semibold">
                <Typography.Text
                  className="flex items-center gap-x-1 text-text-subtle"
                  size={14}
                  weight="semibold"
                >
                  See all 130k bets
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
