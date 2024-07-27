import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

import Banner from './components/Banner';
import MarketTab from './components/MarketTab';
import RecentActivity from './components/RecentActivity';
import Slider from './components/Slider';
import TopVolume from './components/TopVolume';
import VoteCard from './components/VoteCards';

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
      <Slider slides={mockSlides} />
      <MarketTab />
      <Container>
        <VoteCard />
        <div className="grid grid-cols-2">
          <RecentActivity data={mockRecentActivities} />
          <TopVolume data={mockTopVolumeThisWeek} />
        </div>
      </Container>
    </section>
  );
}
