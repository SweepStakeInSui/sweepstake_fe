'use client';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Skeleton } from '@/components/ui/skeleton';

const VoteCardSkeleton = () => {
  return (
    <div className="p-4 border border-borderSublest rounded-lg relative bg-bg-surface">
      <Flex className="gap-x-4">
        <Skeleton className="size-12" />
        <div className="w-full shrink-[999]">
          <Stack className="gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[70%] h-4" />
          </Stack>
          <Flex className="text-text-sublest mt-2">
            <Skeleton className="w-[40%] h-3" />
            <Skeleton className="w-[60%] h-3" />
          </Flex>
        </div>
      </Flex>
      <div className="my-4 relative">
        <Skeleton className="w-full h-13" />
      </div>
      <Flex>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </Flex>
    </div>
  );
};

export default VoteCardSkeleton;
