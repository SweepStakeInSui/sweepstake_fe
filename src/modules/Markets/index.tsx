'use client';

import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
} from '@tanstack/react-query';

import Container from '@/components/common/Container';
import { Banner } from '@/modules/Home/components/Banner';
import { MarketTab } from '@/modules/Home/components/MarketTab';
import HomeSlider from '@/modules/Home/components/Slider';
import VoteCardGrid from '@/modules/Home/components/VoteCardGrid';

export default function MarketsModule() {
  const queryClient = useQueryClient();
  return (
    <section>
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketTab showSubTabs={false} />
      </HydrationBoundary>
      <HomeSlider />
      <Container size="sm">
        <VoteCardGrid />
      </Container>
    </section>
  );
}
