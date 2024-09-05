import Stack from '@components/common/Stack';
import React from 'react';

import Typography from '../../../../components/common/Typography';
import PreviewBetAbout from './About';
import PreviewBetDetail from './Detail';
import PreviewBetRulesSummary from './RulesSummary';

const PreviewBetModule = () => {
  return (
    <Stack className="gap-y-0 shrink-[100] max-w-[49.375rem] w-full mx-auto my-10">
      <Typography.Heading size={28} className="mb-6">
        Create Your Bet
      </Typography.Heading>
      <Typography.Heading size={20} className="text-text-sublest mb-2">
        Preview
      </Typography.Heading>
      <Stack className="gap-y-8 bg-bg-surface">
        <PreviewBetDetail />
        <PreviewBetRulesSummary
          desc="If SpaceX has more than 120 launches in 2024, then the market resolves to Yes. Outcome verified from Federal Aviation Administration."
          openOn="2021-09-20"
          closeOn="2021-09-20"
          payoutOn="2021-09-20"
          series="2021-09-20"
          event="2021-09-20"
          market="2021-09-20"
        />
        <PreviewBetAbout desc="" />
      </Stack>
    </Stack>
  );
};

export default PreviewBetModule;
