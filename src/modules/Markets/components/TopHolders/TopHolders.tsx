import React from 'react';
import { SwiperSlide } from 'swiper/react';

import Stack from '@/components/common/Stack';
import SwiperCustom from '@/components/common/SwipperCustom';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { TopVolumeItem } from '@/modules/Home/components/TopVolume/TopVolume';
import type { TopVolumeType } from '@/types/topVolume';

interface TopHoldersProps {
  data: TopVolumeType[];
}
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
const TopHolders: React.FC<TopHoldersProps> = ({ data }) => {
  return (
    <div>
      <div className="px-2 py-3 mb-2">
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
      <div className="grid grid-cols-2">
        <Stack>
          <Typography.Text
            size={16}
            weight="medium"
            className="text-text-support-match px-2"
          >
            Yes Holder
          </Typography.Text>
          {data.map((item) => (
            <TopVolumeItem key={item.id} {...item} />
          ))}
        </Stack>
        <Stack>
          <Typography.Text
            size={16}
            weight="medium"
            className="text-text-support-blue px-2"
          >
            No Holder
          </Typography.Text>
          {data.map((item) => (
            <TopVolumeItem key={item.id} {...item} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default TopHolders;
