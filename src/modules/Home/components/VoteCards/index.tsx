import Link from 'next/link';
import React from 'react';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

import Card from './Card';

const VoteCard = () => {
  return (
    <>
      <div className="grid grid-cols-autoFill w-full gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Flex className="mt-3 mb-6 mx-auto gap-x-3 justify-center">
        <Typography.Text className="text-text-subtle" size={13}>
          And 130k bets waiting for you
        </Typography.Text>
        <div className="relative">
          <Button variant="see_more_red" className="w-fit p-0">
            <Flex className="gap-x-1">
              <Link href="/" className="font-semibold">
                <Typography.Text
                  className="text-text-support-red flex items-center gap-x-1"
                  size={14}
                  weight="semibold"
                >
                  See all
                </Typography.Text>
              </Link>
              <Svg
                src="/icons/arrow_forward_ios.svg"
                className="text-text-support-red"
              />
            </Flex>
          </Button>
        </div>
      </Flex>
    </>
  );
};

export default VoteCard;
