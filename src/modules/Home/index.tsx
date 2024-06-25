import React from 'react';

import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';

import RecentActivity from './components/RecentActivity';
import PopularTopic from './PopularTopic';
import SliderHero from './SliderHero';
import VoteCard from './VoteCards';

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
