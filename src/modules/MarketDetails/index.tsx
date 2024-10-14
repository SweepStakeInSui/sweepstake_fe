'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Flex from '@/components/common/Flex';
import { SectionIndicator } from '@/components/common/SectionIndicatorWrapper';
import Stack from '@/components/common/Stack';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { BetOutcomeType } from '@/enums/bet-status';
import { MarketsActionForm } from '@/modules/MarketDetails/components/ActionForm';
import { MarketsWatchList } from '@/modules/MarketDetails/components/WatchList';
import { marketService } from '@/services/markets';
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

  const { data: marketDetailData } = useQuery({
    queryKey: ['marketDetail', id],
    queryFn: async () => marketService.getMarketDetailsService(id),
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
        type: BetOutcomeType.YES,
        bidPriceYes: yesOutcome?.bidPrice || 0,
        bidPriceNo: noOutcome?.bidPrice || 0,
        askPriceYes: yesOutcome?.askPrice || 0,
        askPriceNo: noOutcome?.askPrice || 0,
      }),
    );
  }, [marketDetailData]);

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
                openOn={
                  marketDetailData?.startTime
                    ? format(
                        new Date(marketDetailData.startTime * 1000),
                        'yyyy-MM-dd',
                      )
                    : ''
                }
                closeOn={
                  marketDetailData?.endTime
                    ? format(
                        new Date(marketDetailData.endTime * 1000),
                        'yyyy-MM-dd',
                      )
                    : ''
                }
                payoutOn="2021-09-20"
                categories={['']}
              />
            </SectionIndicator>

            <SectionIndicator section="about" ref={aboutRef}>
              <MarketsAbout desc={marketDetailData?.description || ''} />
            </SectionIndicator>

            <SectionIndicator section="relate-market" ref={relateMarketRef}>
              <MarketsRelateMarket />
            </SectionIndicator>

            <SectionIndicator section="idea" ref={ideaRef}>
              <LevelSection />
            </SectionIndicator>
          </Stack>

          <DrawerContent className="block lg:hidden">
            <MarketsActionForm />
          </DrawerContent>
          <div className="hidden lg:flex sticky top-2 lg:top-[4.75rem]">
            <MarketsActionForm />
          </div>
        </Flex>
      </Flex>
    </Drawer>
  );
}
