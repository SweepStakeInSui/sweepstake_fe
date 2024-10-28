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
import { categoryService } from '@/services/categoryService';
import { MarketService } from '@/services/markets';

export default async function MarketsModule() {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: categoryService.getCategory,
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
