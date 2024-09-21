import Stack from '@components/common/Stack';
import { format } from 'date-fns';
import React from 'react';

import useWindowSize from '@/hooks/common/useWindowSize';

import Typography from '../../../../components/common/Typography';
import type { IFormattedCreateBetData } from '../../../../services/markets/types';
import PreviewBetAbout from './About';
import PreviewBetDetail from './Detail';
import PreviewBetRulesSummary from './RulesSummary';

interface IPreviewBetModuleProps {
  data: IFormattedCreateBetData;
}

const PreviewBetModule = ({ data }: IPreviewBetModuleProps) => {
  const { isMobile } = useWindowSize();

  return (
    <Stack className="gap-y-0 shrink-[100] max-w-[49.375rem] w-full mx-auto lg:my-10 px-0 lg:px-5">
      {!isMobile && (
        <>
          <Typography.Heading size={28} className="mb-6">
            Create Your Bet
          </Typography.Heading>
          <Typography.Heading size={20} className="text-text-sublest mb-2">
            Preview
          </Typography.Heading>
        </>
      )}

      <Stack className="gap-y-8 bg-bg-surface rounded-lg p-5">
        <PreviewBetDetail {...data} />

        <PreviewBetRulesSummary
          desc={data.rule}
          startDate={format(new Date(data.startTime), 'MMM dd, yyyy')}
          startClock={format(new Date(data.startTime), 'HH:mm')}
          endDate={format(new Date(data.endTime), 'MMM dd, yyyy')}
          endClock={format(new Date(data.endTime), 'HH:mm')}
          payoutOn={format(new Date(data.endTime), 'MMM dd, yyyy')}
          categories={data.categories.reduce<string[]>((prev, curr) => {
            prev.push(curr.label as string);
            return prev;
          }, [])}
        />

        {data.about && (
          <PreviewBetAbout desc={data.about} sources={data.sources} />
        )}
      </Stack>
    </Stack>
  );
};

export default PreviewBetModule;
