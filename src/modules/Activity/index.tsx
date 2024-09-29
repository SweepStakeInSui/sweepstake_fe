import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';

import { ActivityItem } from '../Home/components/RecentActivity';

const ActivityModule = () => {
  const data = mockRecentActivities;
  return (
    <Container className="max-w-screen-lg px-4 py-8 lg:py-10" size="sm">
      <Typography.Heading size={32} className="text-text lg:my-4">
        Recent Activity
      </Typography.Heading>
      <Stack className="gap-4">
        {data.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </Stack>
    </Container>
  );
};

export default ActivityModule;
