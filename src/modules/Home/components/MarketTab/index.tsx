'use client';

import { TrophyIcon } from 'lucide-react';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

import SwiperCustom from '@/components/common/SwipperCustom';

const marketTav = [
  {
    id: 1,
    type: 'Top',
    icon: <TrophyIcon className="w-4 h-4 " />,
  },
  {
    id: 2,
    type: 'New',
  },
  {
    id: 1,
    type: 'Us Election',
  },
  {
    id: 1,
    type: 'Breaking News',
  },
  {
    id: 1,
    type: 'Biden',
  },
  {
    id: 1,
    type: 'Euro 2024',
  },
  {
    id: 1,
    type: 'UK Election',
  },
  {
    id: 1,
    type: 'French Election',
  },
  {
    id: 1,
    type: 'Global Ban',
  },
  {
    id: 1,
    type: 'Football',
  },
  {
    id: 1,
    type: 'Esport Live',
  },
  {
    id: 1,
    type: 'NBA Draft',
  },
  {
    id: 1,
    type: 'Fed Rate',
  },
  {
    id: 1,
    type: 'Game Online',
  },
  {
    id: 1,
    type: 'Game Offline',
  },
  {
    id: 1,
    type: 'KingDom ',
  },
  {
    id: 1,
    type: 'Animals Selection',
  },
  {
    id: 1,
    type: 'Gender',
  },
  {
    id: 1,
    type: 'Flowers',
  },
];
const MarketTab = () => {
  return (
    <div className="py-6">
      <SwiperCustom slidesPerView="auto" spaceBetween={12} size={28}>
        {marketTav.map((item) => (
          <SwiperSlide
            key={item.id}
            className={`swiper-tab px-3 py-2 cursor-pointer ${item.type === 'Top' ? 'bg-primary-a800 text-white' : 'bg-elevation-a200 text-elevation-a900 '} rounded-lg font-semibold`}
          >
            <div className="flex gap-x-1 items-center">
              {item.icon}
              <p className="w-fit text-nowrap">{item.type}</p>
            </div>
          </SwiperSlide>
        ))}
      </SwiperCustom>
    </div>
  );
};

export default MarketTab;
