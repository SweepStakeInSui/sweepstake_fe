'use client';

import { SwiperSlide } from 'swiper/react';

import SwiperCustom from '@/components/common/SwipperCustom';
import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';

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

const MarketTab = () => {
  return (
    <Container>
      <ul className="flex gap-x-4 text-tab-btnNo font-medium justify-center mt-5 mb-3">
        {marketMainTab.map((item) => (
          <li className="py-[6px] cursor-pointer relative group" key={item.id}>
            <p
              className={`${item.active && 'text-tab-btnNo-selected font-semibold active:text-tab-btnNo-textPress'}`}
            >
              {item.type}
            </p>
            <p
              className={`absolute  bottom-0 ${item.active ? 'bg-tab-btnNo-selected w-full ' : 'w-0 group-hover:w-full bg-tab-btnNo'} h-[2px]  transition-all duration-150 ease-linear`}
            />
          </li>
        ))}
      </ul>
      <div className="mt-3 mb-5 mx-auto">
        <SwiperCustom slidesPerView="auto" spaceBetween={12} size={28}>
          {marketSubTab.map((item) => (
            <SwiperSlide
              key={item.id}
              className={`swiper-tab cursor-pointer ${item.type === 'Top' ? 'bg-tab-btnYes-bgSelected text-text-inverse' : 'bg-elevation-a200 text-elevation-a900 '} rounded-lg`}
            >
              <Button
                variant={`${item.active ? 'secondary' : 'sub_btn'}`}
                className="flex gap-x-1 items-center"
              >
                <p className="w-fit text-nowrap font-semibold">{item.type}</p>
              </Button>
            </SwiperSlide>
          ))}
        </SwiperCustom>
      </div>
    </Container>
  );
};

export default MarketTab;
