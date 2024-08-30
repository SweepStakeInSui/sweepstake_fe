import React from 'react';

import Flex from '../../components/common/Flex';
import Stack from '../../components/common/Stack';
import MarketsAboutSummarySkeleton from '../../modules/Markets/components/About/Skeleton';
import MarketsActionFormSkeleton from '../../modules/Markets/components/ActionForm/Skeleton';
import MarketsDetailSkeleton from '../../modules/Markets/components/Detail/Skeleton';
import MarketsRulesSummarySkeleton from '../../modules/Markets/components/RulesSummary/Skeleton';
import MarketsWatchListSkeleton from '../../modules/Markets/components/WatchList/Skeleton';

const Loading = () => {
  return (
    <Flex className="items-start gap-0">
      <MarketsWatchListSkeleton />

      <Flex className="transition-all shrink-[100] items-start w-full gap-0">
        <Stack className="shrink-[100] max-w-[49.375rem] w-full mx-auto gap-y-8">
          <MarketsDetailSkeleton />
          <MarketsRulesSummarySkeleton />
          <MarketsAboutSummarySkeleton />
        </Stack>

        <MarketsActionFormSkeleton />
      </Flex>
    </Flex>
  );
};

export default Loading;
