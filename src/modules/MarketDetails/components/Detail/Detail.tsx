import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AddWatchListButton } from '@/components/common/AddWatchListButton';
import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';
import { mockAvatar } from '@/mocks/mockAvatar';
import type { TBetItem } from '@/services/markets/types';
import { setBet } from '@/store/betSlice';

import { MarketTiles } from '../MarketTiles';

// interface IMarketsDetailProps {
//   title: string;
//   chance: number;
//   percent: number;
// }

const statistic = [
  {
    id: '1',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    yes: 78,
    no: 29,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
  {
    id: '2',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    yes: 10,
    no: 90,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
  {
    id: '3',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    yes: 50,
    no: 50,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
];

interface IMarketsDetailProps {
  bet: TBetItem;
}

export default function MarketsDetail({ bet }: IMarketsDetailProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBet({
        id: statistic[0]?.id,
        type: 1,
        yes: statistic[0]?.yes,
        no: statistic[0]?.no,
      }),
    );
  }, [statistic]);
  console.log(bet);

  return (
    <div>
      <Stack className="gap-y-0">
        <Flex className="mb-3">
          <Flex className="gap-1">
            <Svg src="/icons/monetization.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              $120,000,000 bet
            </Typography.Text>
          </Flex>
          <Separator orientation="vertical" className="h-3 bg-borderMain" />
          <Flex className="gap-1">
            <Svg src="/icons/clock.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              Aug 21, 2024
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex className="items-start justify-between gap-3 mb-2">
          <Flex className="gap-3">
            <div className="relative size-[3.75rem] aspect-1 rounded-md overflow-hidden">
              <Image src={mockAvatar} fill alt="" objectFit="cover" />
            </div>
            <Typography.Heading size={28} className="line-clamp-2 shrink-[999]">
              {bet.name}
            </Typography.Heading>
          </Flex>

          <Flex className="gap-0">
            <AddWatchListButton bet={bet} showText={false} size={24} />
            <Tooltip content="Share bet link">
              <div>
                <IconButton isRounded>
                  <Svg src="/icons/launch.svg" className="text-icon" />
                </IconButton>
              </div>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex className="items-center">
          <Typography.Heading className="text-text" size={20}>
            24.2
          </Typography.Heading>

          <div>
            <Typography.Text
              className="text-text inline-flex items-center gap-1"
              size={15}
            >
              chance{' '}
              <Typography.Text
                tag="span"
                className="text-text-support-green"
                size={15}
              >
                +2%
              </Typography.Text>
              <span>
                <Svg
                  src="/icons/info_outline.svg"
                  className="text-icon-subtle"
                />
              </span>
            </Typography.Text>
          </div>
        </Flex>
      </Stack>

      <Stack className="gap-3">
        <Stack className="gap-0">
          <Flex className="hidden-mobile w-full justify-between border-b border-borderSublest py-1">
            <Typography.Text size={13} className="text-text-subtle">
              Outcome
            </Typography.Text>

            <Flex className="w-[21.25rem]">
              <Typography.Text size={13} className="text-text-subtle">
                %Chance
              </Typography.Text>
            </Flex>
          </Flex>

          <MarketTiles data={statistic} />
        </Stack>

        <Button
          variant="ghost"
          className="text-text-support-blue pl-0 hover:bg-transparent active:bg-transparent"
        >
          2 more markets
          <span>
            <Svg src="/icons/chevron_right.svg" className="rotate-90" />
          </span>
        </Button>
      </Stack>
    </div>
  );
}
