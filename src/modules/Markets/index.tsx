'use client';

import { useRef } from 'react';

import Flex from '@/components/common/Flex';
import { SectionIndicator } from '@/components/common/SectionIndicatorWrapper';
import Stack from '@/components/common/Stack';

import { MarketsAbout } from './components/About';
import { MarketsDetail } from './components/Detail';
import { LevelSection } from './components/LevelSection';
import { MarketsRelateMarket } from './components/RelateMarket';
import { MarketsRulesSummary } from './components/RulesSummary';

export default function MarketsModule() {
  const topPageRef = useRef<HTMLDivElement>(null);
  const ruleSummaryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const relateMarketRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLDivElement>(null);

  return (
    <Flex className="items-start gap-0">
      {/* <MarketsWatchList /> */}

      <Flex className="transition-all shrink-[100] items-start w-full gap-0">
        <Stack className="shrink-[100] max-w-[49.375rem] w-full mx-auto gap-y-8">
          <SectionIndicator section="/" ref={topPageRef}>
            <MarketsDetail />
          </SectionIndicator>

          <SectionIndicator section="rule-summary" ref={ruleSummaryRef}>
            <MarketsRulesSummary
              desc="If SpaceX has more than 120 launches in 2024, then the market resolves to Yes. Outcome verified from Federal Aviation Administration."
              openOn="2021-09-20"
              closeOn="2021-09-20"
              payoutOn="2021-09-20"
              categories={['']}
            />
          </SectionIndicator>

          <SectionIndicator section="about" ref={aboutRef}>
            <MarketsAbout
              desc={`The "Deadpool & Wolverine" movie, directed by Shawn Levy and starring Ryan Reynolds and Hugh Jackman, is set to release on July 26, 2024. The film's trailer, which premiered during the Super Bowl, broke the record for the most viewed trailer in the first 24 hours with 365 million views. The "Deadpool" franchise has consistently received high Rotten Tomatoes scores, with the first film holding an 85% critics score and the second film holding an 84% critics score.`}
            />
          </SectionIndicator>

          <SectionIndicator section="relate-market" ref={relateMarketRef}>
            <MarketsRelateMarket />
          </SectionIndicator>

          <SectionIndicator section="idea" ref={ideaRef}>
            <LevelSection />
          </SectionIndicator>
        </Stack>

        {/* <MarketsActionForm /> */}
      </Flex>
    </Flex>
  );
}
