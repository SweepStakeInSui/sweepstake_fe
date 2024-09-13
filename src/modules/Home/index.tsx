import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

import { Banner } from './components/Banner';
import { MarketTab } from './components/MarketTab';
import RecentActivity from './components/RecentActivity/RecentActivity';
import Slider from './components/Slider';
import { TopVolume } from './components/TopVolume';
import VoteCardGrid from './components/VoteCardGrid';

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

export default function HomeModule() {
  return (
    <section>
      <Banner />
      <MarketTab />
      <Slider slides={mockSlides} />
      <Container size="sm">
        <VoteCardGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 py-8 bg-white relative overflow-hidden gap-10">
          <RecentActivity data={mockRecentActivities} />
          <TopVolume data={mockTopVolumeThisWeek} />
          <div className="absolute w-1/2 h-full left-1/2 -translate-x-1/2 top-1/2 blur-2xl bg-top-home opacity-10 rounded-full z-0" />
        </div>
      </Container>
    </section>
  );
}
