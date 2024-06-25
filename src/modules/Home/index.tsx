import React from 'react';

import PopularTopic from './PopularTopic';
import SliderHero from './SliderHero';
import VoteCard from './VoteCards';
import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';

import RecentActivity from './components/RecentActivity';

export default function HomeModule() {
  return (
    <Container>
      <SliderHero />
      <PopularTopic />
      <VoteCard />
      <RecentActivity data={mockRecentActivities} />
    </Container>
  );
}
