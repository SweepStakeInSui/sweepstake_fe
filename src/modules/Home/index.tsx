/* eslint-disable no-void */

'use client';

import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/common/Container';

import { Banner } from './components/Banner';
import { MarketTab } from './components/MarketTab';
import RecentActivity from './components/RecentActivity/RecentActivity';
import Slider from './components/Slider';
import { TopVolume } from './components/TopVolume';
import VoteCardGrid from './components/VoteCardGrid';
import { activityOptions } from './query_options/activity';
import { marketPopularOptions } from './query_options/market_popular';

export default function HomeModule() {
  const queryClient = useQueryClient();
  void queryClient.prefetchQuery(activityOptions);
  void queryClient.prefetchQuery(marketPopularOptions);

  return (
    <section>
      <Banner />
      <MarketTab />
      <Slider />
      <Container size="sm">
        <VoteCardGrid isForDisplay />
      </Container>

      <div className="bg-bg-surface">
        <Container size="sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 py-8 relative overflow-hidden gap-10">
            <RecentActivity />
            <TopVolume />
            <div className="absolute w-1/2 h-full left-1/2 -translate-x-1/2 top-1/2 blur-2xl bg-top-home opacity-10 rounded-full z-0" />
          </div>
        </Container>
      </div>
    </section>
  );
}
