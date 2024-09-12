import React from 'react';

import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import { Skeleton } from '@/components/ui/skeleton';

const TitleAndTextBlockSkeleton = () => {
  return (
    <Paper>
      <Stack>
        <Skeleton className="w-[100px] h-6" />
        <Skeleton className="w-full h-[150px]" />
      </Stack>
    </Paper>
  );
};

export default TitleAndTextBlockSkeleton;
