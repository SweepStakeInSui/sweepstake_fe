import React from 'react';

import Flex from '../../../../components/common/Flex';
import Stack from '../../../../components/common/Stack';
import { Skeleton } from '../../../../components/ui/skeleton';

const RecentActivityItemSkeleton = () => {
  return (
    <Flex className="justify-between p-2 overflow-hidden rounded-sm">
      <Flex className="gap-x-2">
        <Skeleton className="rounded-full size-11" />
        <Stack>
          <Skeleton className="w-[400px] h-4" />
          <Skeleton className="w-[80%] h-4" />
        </Stack>
      </Flex>
    </Flex>
  );
};

const RecentActivitySkeleton = () => {
  return (
    <Stack className="gap-4 z-10">
      <Flex className="justify-between">
        <Skeleton className="h-6 w-[100px]" />
      </Flex>
      <Stack className="gap-4">
        {[...Array(5)].map((_, index) => (
          <RecentActivityItemSkeleton key={index.toString()} />
        ))}
      </Stack>
    </Stack>
  );
};

export default RecentActivitySkeleton;
