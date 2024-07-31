'use client';

import { SwiperSlide } from 'swiper/react';

import SwiperCustom from '@/components/common/SwipperCustom';
import { Button } from '@/components/ui/button';

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
    id: 1,
    type: 'Midle East',
  },
  {
    id: 1,
    type: 'Sports',
  },
  {
    id: 1,
    type: 'Crypto',
  },
  {
    id: 1,
    type: 'Pop Culture',
  },
  {
    id: 1,
    type: 'Business',
  },
  {
    id: 1,
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
    <div>
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
      <div className="mt-3 mb-5 max-w-[80%] mx-auto">
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
    </div>
  );
};

export default MarketTab;
