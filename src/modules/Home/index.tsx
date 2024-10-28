'use client';

import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/common/Container';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';
import { MarketService } from '@/services/markets';
import { OrderService } from '@/services/orders';

import { Banner } from './components/Banner';
import { MarketTab } from './components/MarketTab';
import RecentActivity from './components/RecentActivity/RecentActivity';
import Slider from './components/Slider';
import { TopVolume } from './components/TopVolume';
import VoteCardGrid from './components/VoteCardGrid';

export default async function HomeModule() {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['activity'],
    queryFn: async () => {
      const result = await OrderService.getOrder({
        page: 1,
        limit: 5,
      });
      return result;
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['marketPopular'],
    queryFn: async () => {
      const result = await MarketService.getMarketPopular({
        page: 1,
        limit: 10,
      });
      return result;
    },
  });
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
            <TopVolume data={mockTopVolumeThisWeek} />
            <div className="absolute w-1/2 h-full left-1/2 -translate-x-1/2 top-1/2 blur-2xl bg-top-home opacity-10 rounded-full z-0" />
          </div>
        </Container>
      </div>
    </section>
  );
}
