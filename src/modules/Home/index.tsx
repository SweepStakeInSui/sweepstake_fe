import React from 'react';

import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';

import RecentActivity from './components/RecentActivity';
import PopularTopic from './PopularTopic';
import SliderHero from './SliderHero';
import VoteCard from './components/VoteCards';
import TopVolume from './components/TopVolume';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

export default function HomeModule() {
  return (
    <Container>
      <SliderHero />
      <PopularTopic />
      <VoteCard />
      <div className="grid grid-cols-2 gap-4">
        <RecentActivity data={mockRecentActivities} />
        <TopVolume data={mockTopVolumeThisWeek} />
      </div>
    </Container>
  );
}
