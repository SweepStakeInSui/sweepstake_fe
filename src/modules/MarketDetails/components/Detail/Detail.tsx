// import { Accordion } from '@radix-ui/react-accordion';
import { format } from 'date-fns';
import Image from 'next/image';

import { AddWatchListButton } from '@/components/common/AddWatchListButton';
import CopyButton from '@/components/common/CopyButton/CopyButton';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { defaultImg } from '@/constants/defaultImg';
import { MarketTile } from '@/modules/MarketDetails/components/MarketTiles/MarketTiles';
import { SingleBetOrderBook } from '@/modules/MarketDetails/components/SingleBetOrderBook';
import type { TBetItem } from '@/services/markets/types';

interface IMarketsDetailProps {
  bet: TBetItem;
}

export default function MarketsDetail({ bet }: IMarketsDetailProps) {
  return (
    <div>
      <Stack className="gap-y-0 mb-4">
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
              {format(bet.startTime * 1000, 'MMM dd, yyyy')}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex className="items-start justify-between gap-3 mb-2">
          <Flex className="gap-3">
            <div className="relative size-[3.75rem] aspect-1 rounded-md overflow-hidden">
              <Image
                src={bet.image || defaultImg}
                fill
                alt=""
                objectFit="cover"
              />
            </div>
            <Typography.Heading size={28} className="line-clamp-2 shrink-[999]">
              {bet.name}
            </Typography.Heading>
          </Flex>

          <Flex className="gap-0">
            <AddWatchListButton bet={bet} showText={false} size={24} />
            <CopyButton
              tooltipContent="Copy bet link"
              content={window.location.href}
              icon={<Svg src="/icons/launch.svg" />}
              iconClassName="p-1"
            />
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
          {/* <Flex className="hidden-mobile w-full justify-between border-b border-borderSublest py-1">
            <Typography.Text size={13} className="text-text-subtle">
              Outcome
            </Typography.Text>

            <Flex className="w-[21.25rem]">
              <Typography.Text size={13} className="text-text-subtle">
                %Chance
              </Typography.Text>
            </Flex>
          </Flex> */}

          <Accordion type="single" collapsible className="lg:hidden w-full">
            <MarketTile isSingleBet data={bet} />
          </Accordion>

          <SingleBetOrderBook />
        </Stack>

        {/* <Button
          variant="ghost"
          className="text-text-support-blue pl-0 hover:bg-transparent active:bg-transparent"
        >
          2 more markets
          <span>
            <Svg src="/icons/chevron_right.svg" className="rotate-90" />
          </span>
        </Button> */}
      </Stack>
    </div>
  );
}
