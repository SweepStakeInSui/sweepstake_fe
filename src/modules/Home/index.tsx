import React from 'react';

import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';

import RecentActivity from './components/RecentActivity';

export default function HomeModule() {
  return (
    <Container>
      <RecentActivity data={mockRecentActivities} />
    </Container>
  );
}
