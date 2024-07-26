import Container from '@/components/common/Container';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

import Banner from './components/Banner';
import MarketTab from './components/MarketTab';
import RecentActivity from './components/RecentActivity';
import TopVolume from './components/TopVolume';
import VoteCard from './components/VoteCards';
import Slider from './components/Slider';

export default function HomeModule() {
  return (
    <section>
      <Banner />
      <Slider />
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
