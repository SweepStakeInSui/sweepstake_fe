import React from 'react';

import Flex from '../../../../components/common/Flex';
import Stack from '../../../../components/common/Stack';
import { Skeleton } from '../../../../components/ui/skeleton';

const TopVolumeItemSkeleton = () => {
  return (
    <Flex className="justify-between p-2 overflow-hidden rounded-sm">
      <Flex className="gap-x-2">
        <Skeleton className="rounded-full size-11" />
        <Stack>
          <Skeleton className="w-[80%] h-4" />
          <Skeleton className="w-[200px] h-4" />
        </Stack>
      </Flex>
    </Flex>
  );
};

const TopVolumeSkeleton = () => {
  return (
    <Stack className="gap-4 z-10">
      <Flex className="justify-between">
        <Skeleton className="w-[100px] h-6" />
      </Flex>
      <div className="grid grid-rows-5 grid-flow-col gap-4">
        {[...Array(10)].map((_, index) => (
          <TopVolumeItemSkeleton key={index.toString()} />
        ))}
      </div>
    </Stack>
  );
};

export default TopVolumeSkeleton;
