// eslint-disable-file
// import { useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Accordion } from '@/components/ui/accordion';
import { MarketTile } from '@/modules/MarketDetails/components/MarketTiles/MarketTiles';
import type { TBetItem } from '@/services/markets/types';

interface IMultipleMarketsDetailProps {
  bet: TBetItem[];
}

export default function MultipleMarketsDetail({
  bet,
}: IMultipleMarketsDetailProps) {
  // const betState = useSelector((state: any) => state.bet);
  // const [view, setView] = useState<FilterTimes>('1m');
  // const [visibilityState, setVisibilityState] = useState<boolean[]>([
  //   true,
  //   true,
  // ]);

  // QUERIES
  // const { data: orderBookData } = useQuery({
  //   queryKey: ['orderBookData', bet.id],
  //   queryFn: () => MarketService.getOrderBook(bet.id),
  //   enabled: !!bet.id,
  //   refetchInterval: 5000,
  // });

  // const formattedOrderBook = useMemo(() => {
  //   const betType = betState.type;
  //   const bidType = `bid${betType}` as TSideType;
  //   const askType = `ask${betType}` as TSideType;
  //   let cumulativeAsksTotal = 0;
  //   let cumulativeBidsTotal = 0;

  //   const asks = orderBookData?.data?.[askType]?.slice(1)?.map((ask) => {
  //     const currentTotal =
  //       Number(handleBignumber.divideDecimal(ask.price ?? 0)) *
  //       Number(handleBignumber.divideDecimal(ask.liquidity, 0));
  //     cumulativeAsksTotal += currentTotal;

  //     return {
  //       price: handleBignumber.divideDecimal(ask.price ?? 0),
  //       liquidity: handleBignumber.divideDecimal(ask.liquidity, 0),
  //       total: cumulativeAsksTotal,
  //     };
  //   });

  //   const bids = orderBookData?.data?.[bidType]?.slice(1)?.map((bid) => {
  //     const currentTotal =
  //       Number(handleBignumber.divideDecimal(bid.price ?? 0)) *
  //       Number(handleBignumber.divideDecimal(bid.liquidity, 0));

  //     cumulativeBidsTotal += currentTotal;

  //     return {
  //       price: handleBignumber.divideDecimal(bid.price ?? 0),
  //       liquidity: handleBignumber.divideDecimal(bid.liquidity, 0),
  //       total: cumulativeBidsTotal,
  //     };
  //   });

  //   return {
  //     asks,
  //     bids,
  //   };
  // }, [orderBookData?.data, betState.type]);

  // const timeRange = getMemoizedTimeRange(view);

  // const { data: priceHistoryData } = useQuery({
  //   queryKey: ['priceHistory', bet.id, view],
  //   queryFn: () =>
  //     PriceHistoryService.getPriceHistory({
  //       start: (timeRange.start / 1000).toFixed(0),
  //       end: (timeRange.end / 1000).toFixed(0),
  //       marketId: bet.id,
  //       time: view === '1y' ? '1h' : '1m',
  //     }),
  //   enabled: !!bet.id,
  //   refetchInterval: 5000,
  // });

  // const formattedPriceHistory = useMemo(() => {
  //   const result: {
  //     yes: number[][];
  //     no: number[][];
  //   } = { yes: [], no: [] };
  //   priceHistoryData?.data?.map((item) => {
  //     return result.yes.push([
  //       Number(item?.timestamp) * 1000,
  //       Number(handleBignumber.divideDecimal(item?.price)),
  //     ]);
  //   });

  //   priceHistoryData?.data?.map((item) => {
  //     return result.no.push([
  //       Number(item?.timestamp) * 1000,
  //       100 - Number(handleBignumber.divideDecimal(item?.price)),
  //     ]);
  //   });

  //   return result;
  // }, [priceHistoryData?.data, betState.type]);

  // FUNCTIONS
  // const handleViewChange = (viewTime: FilterTimes) => {
  //   setView(viewTime);
  // };

  // EFFECTS
  // useEffect(() => {
  //   if (betState.type === BetOutcomeType.YES) {
  //     setVisibilityState([true, false]);
  //   } else {
  //     setVisibilityState([false, true]);
  //   }
  // }, [betState.type]);

  return (
    <div>
      {/* <Stack className="gap-y-0 mb-4">
        <Flex className="mb-3">
          <Flex className="gap-1">
            <Svg src="/icons/monetization.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              $
              <FormatNumber
                number={handleBignumber.divideDecimal(bet.volume) || 0}
                tag="span"
              />{' '}
              Vol
            </Typography.Text>
          </Flex>
          <Separator orientation="vertical" className="h-3 bg-borderMain" />
          <Flex className="gap-1">
            <Svg src="/icons/clock.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              {format(toEST(new Date(bet.startTime * 1000)), 'MMM dd, yyyy')}
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
            <Typography.Heading
              size={28}
              className="line-clamp-2 shrink-[999] leading-9"
            >
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
            {Number(handleBignumber.divideDecimal(bet.percentage))}%
          </Typography.Heading>

          <div>
            <Typography.Text
              className="text-text inline-flex items-center gap-1"
              size={15}
            >
              chance
              <span>
                <Svg
                  src="/icons/info_outline.svg"
                  className="text-icon-subtle"
                />
              </span>
            </Typography.Text>
          </div>
        </Flex>
      </Stack> */}

      <Stack className="gap-3">
        <Stack className="gap-0">
          {/* TODO: orderbook for multiple bets */}
          {/* <MarketLineChart
            data={[
              {
                showInLegend: false,
                name: 'Chance',
                data: formattedPriceHistory.yes,
                type: 'line',
                color: '#32BFC9',
              },
              {
                showInLegend: false,
                name: 'Chance',
                data: formattedPriceHistory.no,
                type: 'line',
                color: '#4B80FB',
              },
            ]}
            onTimeChange={handleViewChange}
            visibilityState={visibilityState}
          /> */}

          <Accordion type="single" collapsible className="lg:hidden w-full">
            {bet.map((b) => (
              <MarketTile key={b.id} data={b} />
            ))}
          </Accordion>

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

          <Accordion type="single" collapsible className="w-full">
            {bet.map((b) => (
              <MarketTile key={b.id} data={b} />
            ))}
          </Accordion>

          {/* <SingleBetOrderBook type={betState.type} data={formattedOrderBook} /> */}
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
