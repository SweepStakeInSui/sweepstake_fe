import React from 'react';

import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

import MarketTab from './components/MarketTab';
import RecentActivity from './components/RecentActivity';
import TopVolume from './components/TopVolume';
import VoteCard from './components/VoteCards';
import PopularTopic from './PopularTopic';
import SliderHero from './SliderHero';

export default function HomeModule() {
  return (
    <Container className="mb-12">
      <SliderHero />
      <PopularTopic />
      <MarketTab />
      <VoteCard />
      <div className="grid grid-cols-2 gap-4">
        <RecentActivity data={mockRecentActivities} />
        <TopVolume data={mockTopVolumeThisWeek} />
      </div>
    </Container>
  );
}
