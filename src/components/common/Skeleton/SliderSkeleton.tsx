import Container from '@components/common/Container';
import Flex from '@components/common/Flex';
import Stack from '@components/common/Stack';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const SliderSkeleton = () => {
  return (
    <Stack>
      <Flex className="relative overflow-hidden w-full gap-4">
        <Skeleton className="w-[352px] h-[380px]" />
        <Skeleton className="w-full h-[380px]" />
        <Skeleton className="w-[352px] h-[380px]" />
      </Flex>
      <Container>
        <Flex className="items-center justify-between h-12">
          <Skeleton className="w-[200px] h-3" />
          <Skeleton className="w-[200px] h-3" />
        </Flex>
      </Container>
    </Stack>
  );
};

export default SliderSkeleton;
