import React from 'react';

import Container from '../components/common/Container';
import Stack from '../components/common/Stack';
import { Skeleton } from '../components/ui/skeleton';
import RecentActivitySkeleton from '../modules/Home/components/RecentActivity/Skeleton';
import SliderSkeleton from '../modules/Home/components/Slider/Skeleton';
import TopVolumeSkeleton from '../modules/Home/components/TopVolume/Skeleton';
import VoteCardGridSkeleton from '../modules/Home/components/VoteCardGrid/Skeleton';

const Loading = () => {
  return (
    <Stack>
      <Skeleton className="w-full h-[91px]" />
      <SliderSkeleton />

      <Container size="sm">
        <VoteCardGridSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 py-8 bg-white relative overflow-hidden">
          <RecentActivitySkeleton />
          <TopVolumeSkeleton />
        </div>
      </Container>
    </Stack>
  );
};

export default Loading;
