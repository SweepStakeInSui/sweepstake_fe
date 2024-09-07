import React from 'react';

import Flex from '../../../../components/common/Flex';
import Paper from '../../../../components/common/Paper';
import Stack from '../../../../components/common/Stack';
import { Skeleton } from '../../../../components/ui/skeleton';

const MarketsDetailSkeleton = () => {
  return (
    <Paper>
      <Stack className="gap-y-0">
        <Skeleton className="h-5 w-[45%] mb-3" />
        <Flex className="items-start justify-between gap-3 mb-2">
          <Flex className="gap-3">
            <Skeleton className="size-[3.75rem]" />
            <Stack className="grow w-[35rem]">
              <Skeleton className="w-full h-7" />
              <Skeleton className="w-[20%] h-7" />
            </Stack>
          </Flex>

          <Flex className="gap-1">
            <Skeleton className="rounded-full size-6" />
            <Skeleton className="rounded-full size-6" />
          </Flex>
        </Flex>
        <Flex className="items-center">
          <Skeleton className="w-[30%] h-5" />
        </Flex>
      </Stack>

      <Skeleton className="w-full h-[350px] mt-3 mb-7" />

      <Stack className="gap-3">
        <Stack className="gap-0">
          <Skeleton className="w-16 h-4 mb-3" />

          {[...Array(3)].map((_, index) => (
            <Skeleton key={index.toString()} className="h-14 w-full mb-4" />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MarketsDetailSkeleton;
