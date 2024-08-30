import React from 'react';

import Flex from '../../../../components/common/Flex';
import Stack from '../../../../components/common/Stack';
import { Skeleton } from '../../../../components/ui/skeleton';

const MarketsActionFormSkeleton = () => {
  return (
    <Stack className="sticky gap-y-4 border-l border-solid border-borderSubtle p-3 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto">
      <Stack className="gap-4 p-3">
        <Flex className="items-center gap-3 mb-2">
          <Skeleton className="size-[2.5rem]" />
          <Skeleton className="h-4 w-[80%]" />
        </Flex>
      </Stack>

      <hr className="border-borderSubtle my-5" />

      <Flex className="gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </Flex>

      <Stack className="gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </Stack>
    </Stack>
  );
};

export default MarketsActionFormSkeleton;
