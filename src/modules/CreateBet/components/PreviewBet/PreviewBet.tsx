import Stack from '@components/common/Stack';
import { format } from 'date-fns';
import React from 'react';

import { toEST } from '@/utils/toEST';

import Typography from '../../../../components/common/Typography';
import type { IFormattedCreateBetData } from '../../../../services/markets/types';
import PreviewBetAbout from './About';
import PreviewBetDetail from './Detail';
import PreviewBetRulesSummary from './RulesSummary';

interface IPreviewBetModuleProps {
  data: IFormattedCreateBetData;
}

const PreviewBetModule = ({ data }: IPreviewBetModuleProps) => {
  return (
    <Stack className="gap-y-0 shrink-[100] max-w-[49.375rem] w-full mx-auto lg:my-10 px-0 lg:px-5">
      <div className="hidden lg:block">
        <Typography.Heading size={28} className="mb-6">
          Create Your Bet
        </Typography.Heading>
        <Typography.Heading size={20} className="text-text-sublest mb-2">
          Preview
        </Typography.Heading>
      </div>

      <Stack className="gap-y-8 bg-bg-surface rounded-lg p-5">
        <PreviewBetDetail {...data} />

        <PreviewBetRulesSummary
          desc={data?.conditions || ''}
          startDate={format(toEST(new Date(data.startDate)), 'MMM dd, yyyy')}
          startClock={format(toEST(new Date(data.startClock)), 'HH:mm aa')}
          endDate={format(toEST(new Date(data.endDate)), 'MMM dd, yyyy')}
          endClock={format(toEST(new Date(data.endClock)), 'HH:mm aa')}
          category={data?.category}
        />

        {data.description && (
          <PreviewBetAbout desc={data.description} sources={data?.sources} />
        )}
      </Stack>
    </Stack>
  );
};

export default PreviewBetModule;
