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

const mockSlides = [
  {
    title: 'Despicable Me 0" Rotten Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
  {
    title: 'Despicable Me 1 Rotten Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
  {
    title: 'Despicable Me 2" Rotten Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
  {
    title: 'Despicable Me 3" Rotten Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
  {
    title: 'Despicable Me 4" Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
  {
    title: 'Despicable Me 5" Rotten Tomatoes score about ten?',
    forcast: 14,
    percent: 12,
    vol: 1200000,
    desc: {
      title: 'Texas braces for Beryl',
      content:
        'Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen and hit South Texas late Sunday, bringing damaging winds, storm surge, and flooding, CNN reports. This will be the first tropical storm to hit the US this season.',
    },
  },
];

export default async function MarketsModule() {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: categoryService.getCategory,
  });
  return (
    <section>
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketTab showSubTabs={false} />
      </HydrationBoundary>
      <HomeSlider slides={mockSlides} />
      <Container size="sm">
        <VoteCardGrid />
      </Container>
    </section>
  );
}
