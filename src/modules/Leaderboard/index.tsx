import React from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfitLeaderboard } from './components/Profit';
import { VolumeLeaderboard } from './components/Volume';

const LeaderboardModule = () => {
  const tabs = ['Day', 'Week', 'Month', 'All'];
  return (
    <Container className="max-w-screen-lg px-4 py-8 lg:py-10" size="sm">
      <Typography.Heading size={32} className="text-text lg:my-4">
        Leaderboard
      </Typography.Heading>
      <div className="relative">
        <Tabs defaultValue="Day" className="w-full">
          <TabsList className="my-3">
            {tabs.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Flex className="absolute right-0 top-1/2 -translate-y-1/2">
          <Svg src="/icons/timer.svg" />
          <Typography.Text className="text-text" size={13} weight="medium">
            Reset in 23h 48m 03s
          </Typography.Text>
        </Flex>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5">
        <ProfitLeaderboard />
        <VolumeLeaderboard />
      </div>
    </Container>
  );
};

export default LeaderboardModule;
