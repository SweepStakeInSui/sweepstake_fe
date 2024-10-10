'use client';

import { SwiperSlide } from 'swiper/react';

import Container from '@/components/common/Container';
import SwiperCustom from '@/components/common/SwipperCustom';
import { TabBtn } from '@/components/common/Tab/TabBtn';
import TabText from '@/components/common/Tab/TabText';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const marketMainTab = [
  {
    id: 1,
    type: 'All',
    active: true,
  },
  {
    id: 2,
    type: 'Politics',
  },
  {
    id: 3,
    type: 'Midle East',
  },
  {
    id: 4,
    type: 'Sports',
  },
  {
    id: 5,
    type: 'Crypto',
  },
  {
    id: 6,
    type: 'Pop Culture',
  },
  {
    id: 7,
    type: 'Business',
  },
  {
    id: 8,
    type: 'Science',
  },
];
const marketSubTab = [
  {
    id: 1,
    type: 'Top',
    active: true,
  },
  {
    id: 2,
    type: 'New',
  },
  {
    id: 3,
    type: 'Us Election',
  },
  {
    id: 4,
    type: 'Breaking News',
  },
  {
    id: 5,
    type: 'Biden',
  },
  {
    id: 6,
    type: 'Euro 2024',
  },
  {
    id: 7,
    type: 'UK Election',
  },
  {
    id: 8,
    type: 'French Election',
  },
  {
    id: 9,
    type: 'Global Ban',
  },
  {
    id: 10,
    type: 'Football',
  },
  {
    id: 11,
    type: 'Esport Live',
  },
  {
    id: 12,
    type: 'NBA Draft',
  },
  {
    id: 13,
    type: 'Fed Rate',
  },
  {
    id: 14,
    type: 'Game Online',
  },
  {
    id: 15,
    type: 'Game Offline',
  },
  {
    id: 16,
    type: 'KingDom',
  },
  {
    id: 17,
    type: 'Animals Selection',
  },
  {
    id: 18,
    type: 'Gender',
  },
  {
    id: 19,
    type: 'Flowers',
  },
];

interface MarketTabProps {
  showSubTabs?: boolean;
}

const MarketTab = ({ showSubTabs }: MarketTabProps) => {
  return (
    <Container size="sm">
      <ScrollArea>
        <ul className="flex gap-x-4 text-tab-btnNo font-medium justify-center my-3">
          {marketMainTab.map((item) => (
            <TabText
              variant={item.active ? 'selected' : 'default'}
              key={item.id}
              className="cursor-pointer"
            >
              {item.type}
            </TabText>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {showSubTabs && (
        <div className="mt-3 mb-5 mx-auto">
          <SwiperCustom slidesPerView="auto" spaceBetween={12} size={28}>
            {marketSubTab.map((item) => (
              <SwiperSlide
                key={item.id}
                className="swiper-tab cursor-pointer rounded-lg"
              >
                <TabBtn
                  variant={item.active ? 'selected' : 'default'}
                  className="flex gap-x-1 items-center"
                >
                  <p className="w-fit text-nowrap font-semibold ">
                    {item.type}
                  </p>
                </TabBtn>
              </SwiperSlide>
            ))}
          </SwiperCustom>
        </div>
      )}
    </Container>
  );
};

export default MarketTab;
