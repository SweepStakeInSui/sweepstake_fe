import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import AvatarRank from '@/modules/Home/components/TopVolume/AvatarRank';
import { MarketService } from '@/services/markets';
import type { TTopHolderItem } from '@/services/markets/types';

interface TopHolderItemProps {
  item: TTopHolderItem;
  rank: number;
}

export function TopHolderItem({ item, rank }: Readonly<TopHolderItemProps>) {
  return (
    <Flex className="justify-between p-2 overflow-hidden rounded-sm transition-all duration-200 hover:bg-bg-hovered items-start cursor-pointer">
      <Flex className="gap-4">
        <AvatarRank avatar={item?.user?.avatar} id={rank} />
        <Stack className="gap-y-px">
          <Typography.Text size={15} weight="bold" className="text-text">
            {item.user.username}
          </Typography.Text>
          <Flex>
            <Typography.Text size={13} className="text-text-subtle">
              {item.balance} shares
            </Typography.Text>
            <Typography.Text size={13} className="text-text-subtle">
              ~$
            </Typography.Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}
const TopHolders = () => {
  const params = useParams<{ id: string }>();

  const { data: topHoldersData } = useQuery({
    queryKey: ['top-holder', params],
    queryFn: async () =>
      MarketService.getTopHolders({
        marketId: params.id,
        page: 1,
        limit: 10,
      }),
  });

  return (
    <div>
      {/* TODO:more sub categories */}
      {/* <div className="px-2 py-3 mb-2">
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
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <Stack>
          <Typography.Text
            size={16}
            weight="medium"
            className="text-text-support-match px-2"
          >
            Yes Holder
          </Typography.Text>

          {topHoldersData && topHoldersData[1].topHolders.items.length > 0 ? (
            topHoldersData[0].topHolders.items.map((item, index) => (
              <TopHolderItem key={item.userId} item={item} rank={index + 1} />
            ))
          ) : (
            <Empty content="No holder found" />
          )}
        </Stack>
        <Stack>
          <Typography.Text
            size={16}
            weight="medium"
            className="text-text-support-blue px-2"
          >
            No Holder
          </Typography.Text>
          {topHoldersData && topHoldersData[1].topHolders.items.length > 0 ? (
            topHoldersData[1].topHolders.items.map((item, index) => (
              <TopHolderItem key={item.userId} item={item} rank={index + 1} />
            ))
          ) : (
            <Empty content="No holder found" />
          )}
        </Stack>
      </div>
    </div>
  );
};

export default TopHolders;
