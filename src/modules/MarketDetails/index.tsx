'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import { SectionIndicator } from '@/components/common/SectionIndicatorWrapper';
import Stack from '@/components/common/Stack';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { MarketsActionForm } from '@/modules/MarketDetails/components/ActionForm';
import { MarketsWatchList } from '@/modules/MarketDetails/components/WatchList';
import { marketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';

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

  const { isLoggedIn } = useSelector(selectProfile);

  const { data: marketDetailData } = useQuery({
    queryKey: ['marketDetail', id],
    queryFn: async () => marketService.getMarketDetailsService(id),
  });

  return (
    <Drawer>
      <Flex className="items-start gap-0">
        {isLoggedIn && (
          <div className="hidden-mobile sticky top-2 lg:top-[4.75rem]">
            <MarketsWatchList />
          </div>
        )}

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
