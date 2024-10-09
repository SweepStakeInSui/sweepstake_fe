import React from 'react';

import Stack from '@/components/common/Stack';
import { ActivityItem } from '@/modules/Home/components/RecentActivity';
import type { RecentActivityType } from '@/types/recentActivity';

interface ActivityProps {
  data: RecentActivityType[];
}
const Activity: React.FC<ActivityProps> = ({ data }) => {
  return (
    <div>
      <Stack className="gap-4">
        {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </Stack>
    </div>
  );
};

export default Activity;
