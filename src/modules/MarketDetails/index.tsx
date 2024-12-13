'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import { SectionIndicator } from '@/components/common/SectionIndicatorWrapper';
import Stack from '@/components/common/Stack';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { BetOutcomeType } from '@/enums/bet-status';
import { MarketsActionForm } from '@/modules/MarketDetails/components/ActionForm';
import { MarketsWatchList } from '@/modules/MarketDetails/components/WatchList';
import { MarketService } from '@/services/markets';
import { setBet } from '@/store/betSlice';

import { MarketsAbout } from './components/About';
import { MarketsDetail } from './components/Detail';
import { LevelSection } from './components/LevelSection';
import { MarketsRelateMarket } from './components/RelateMarket';
import { MarketsRulesSummary } from './components/RulesSummary';

interface MarketsModuleProps {
  id: string;
}

export default function MarketDetailsModule({ id }: MarketsModuleProps) {
  const topPageRef = useRef<HTMLDivElement>(null);
  const ruleSummaryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const relateMarketRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const betState = useSelector((state: any) => state.bet);

  const { data: marketDetailData } = useQuery({
    queryKey: ['marketDetail', id],
    queryFn: async () => MarketService.getMarketDetails(id),
    refetchInterval: 5000,
  });

  // Init bet state when marketDetailData is loaded
  useEffect(() => {
    if (!marketDetailData) return;
    const yesOutcome = marketDetailData.outcomes.find(
      (outcome) => outcome.type === BetOutcomeType.YES,
    );
    const noOutcome = marketDetailData.outcomes.find(
      (outcome) => outcome.type === BetOutcomeType.NO,
    );

    dispatch(
      setBet({
        id: marketDetailData.id,
        outcomeYesId: marketDetailData.outcomes.find(
          (outcome) => outcome.type === BetOutcomeType.YES,
        )?.id,
        outcomeNoId: marketDetailData.outcomes.find(
          (outcome) => outcome.type === BetOutcomeType.NO,
        )?.id,
        type: betState.type ?? BetOutcomeType.YES,
        isBid: true,
        bidPriceYes: yesOutcome?.bidPrice || 0,
        bidPriceNo: noOutcome?.bidPrice || 0,
        askPriceYes: yesOutcome?.askPrice || 0,
        askPriceNo: noOutcome?.askPrice || 0,
      }),
    );
  }, [marketDetailData, dispatch]);

  return (
    <Drawer>
      <Flex className="items-start gap-0">
        <div className="hidden-mobile sticky top-2 lg:top-[4.75rem]">
          <MarketsWatchList />
        </div>

        <Flex className="transition-all shrink-[100] items-start w-full gap-0">
          <Stack className="shrink-[100] max-w-[49.375rem] w-full mx-auto gap-y-8 p-5">
            <SectionIndicator section="/" ref={topPageRef}>
              {marketDetailData && <MarketsDetail bet={marketDetailData} />}
            </SectionIndicator>

            <SectionIndicator section="rule-summary" ref={ruleSummaryRef}>
              <MarketsRulesSummary
                desc={marketDetailData?.conditions_str || ''}
                openOn={marketDetailData?.startTime}
                closeOn={marketDetailData?.endTime}
                payoutOn={marketDetailData?.payoutTime}
                category={marketDetailData?.category}
              />
            </SectionIndicator>

            <SectionIndicator section="about" ref={aboutRef}>
              <MarketsAbout
                desc={marketDetailData?.description}
                source={marketDetailData?.sources}
              />
            </SectionIndicator>

            <SectionIndicator section="relate-market" ref={relateMarketRef}>
              <MarketsRelateMarket
                marketId={marketDetailData?.id}
                categories={marketDetailData?.category}
              />
            </SectionIndicator>

            <SectionIndicator section="idea" ref={ideaRef}>
              <LevelSection />
            </SectionIndicator>
          </Stack>

          <DrawerContent className="block lg:hidden">
            <MarketsActionForm
              image={marketDetailData?.image}
              startTime={marketDetailData?.startTime || 0}
              endTime={marketDetailData?.endTime || 0}
              payoutOn={marketDetailData?.payoutTime || 0}
            />
          </DrawerContent>
          <div className="hidden lg:flex sticky top-2 lg:top-[4.75rem]">
            <MarketsActionForm
              image={marketDetailData?.image}
              startTime={marketDetailData?.startTime || 0}
              endTime={marketDetailData?.endTime || 0}
              payoutOn={marketDetailData?.payoutTime || 0}
            />
          </div>
        </Flex>
      </Flex>
    </Drawer>
  );
}
