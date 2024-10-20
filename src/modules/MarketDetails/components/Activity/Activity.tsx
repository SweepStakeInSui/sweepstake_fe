import React from 'react';

import Stack from '@/components/common/Stack';
import type { RecentActivityType } from '@/types/recentActivity';

interface ActivityProps {
  data: RecentActivityType[];
}
const Activity: React.FC<ActivityProps> = () => {
  return (
    <div>
      <Stack className="gap-4">
        {/* {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))} */}
        {/* TODO */}
        Upcomming
      </Stack>
    </div>
  );
};

export default Activity;
