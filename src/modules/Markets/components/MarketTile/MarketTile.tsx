import React from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

const MarketTile = () => {
  return (
    <Flex className="w-full justify-between pb-3 border-b border-borderSublest">
      <Stack>
        <Typography.Text size={15} weight="medium">
          Before Aug 9
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          SpaceXlauches in 2023
        </Typography.Text>
      </Stack>
      <Flex className="w-[21.25rem] justify-between">
        <Flex className="w-[6.875rem] items-center gap-1">
          <Typography.Text size={18} weight="medium">
            83%
          </Typography.Text>
          <Typography.Text size={13} className="text-text-support-green">
            +13
          </Typography.Text>
        </Flex>
        <Flex className="w-[14.375rem]">
          <Button variant="bet_yes" className="w-full">
            Yes 72¢
          </Button>
          <Button variant="bet_no" className="w-full">
            No 29¢
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MarketTile;
