'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Container from '@/components/common/Container';
import SwiperCustom from '@/components/common/SwipperCustom';
import { TabBtn } from '@/components/common/Tab/TabBtn';
import TabText from '@/components/common/Tab/TabText';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { marketSubTab } from '@/constants/marketSub';
import { categoryService } from '@/services/categoryService';

interface MarketTabProps {
  showSubTabs?: boolean;
}
const allCategory = {
  id: '1',
  createdAt: '2024-10-17T16:49:45.312Z',
  updatedAt: '2024-10-17T16:49:45.312Z',
  deletedAt: null,
  name: 'All',
};
const MarketTab = ({ showSubTabs }: MarketTabProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ['category'],
    queryFn: categoryService.getCategory,
  });
  const [cate, setCate] = useQueryParam(
    'category',
    withDefault(StringParam, 'All'),
  );
  const dataCategory = [allCategory, ...data];

  return (
    <Container size="sm">
      <ScrollArea>
        <ul className="flex gap-x-4 text-tab-btnNo font-medium justify-center my-3">
          {dataCategory.map((item) => (
            <TabText
              variant={item.name === cate ? 'selected' : 'default'}
              key={item.id}
              className="cursor-pointer"
              onClick={() => setCate(item.name)}
            >
              {item.name}
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
