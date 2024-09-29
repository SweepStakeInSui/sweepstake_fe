'use client';

import React, { useState } from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfitLeaderboard } from './components/Profit';
import { VolumeLeaderboard } from './components/Volume';

const LeaderboardModule = () => {
  const tabs = ['Day', 'Week', 'Month', 'All'];

  const [select, setSelect] = useState<string>('profit');
  const listTabs = [
    {
      label: 'Profit',
      value: 'profit',
      panel: <ProfitLeaderboard />,
    },
    {
      label: 'Volume',
      value: 'volume',
      panel: <VolumeLeaderboard />,
    },
  ];

  const selectedTab = listTabs.find((item) => item.value === select);

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
        <Flex className="absolute right-0 bottom-5">
          <Stack className="lg:flex-row gap-1">
            <Flex className="gap-1 justify-end">
              <Svg src="/icons/timer.svg" />
              <Typography.Text className="text-text" size={13} weight="medium">
                Reset in
              </Typography.Text>
            </Flex>
            <Typography.Text className="text-text" size={13} weight="medium">
              23h 48m 03s
            </Typography.Text>
          </Stack>
        </Flex>
      </div>

      <div className="relative">
        <div className="lg:hidden absolute right-0 top-3">
          <Select defaultValue={select} onValueChange={setSelect}>
            <SelectTrigger className="w-fit border-none mb-4 gap-2 pl-0 bg-transparent" />
            <SelectContent>
              {listTabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="display-block lg:hidden">
          {selectedTab ? selectedTab.panel : null}
        </div>
      </div>

      <div className="hidden lg:display-grid lg:grid grid-cols-1 lg:grid-cols-2 gap-x-5 py-5">
        <ProfitLeaderboard />
        <VolumeLeaderboard />
      </div>
    </Container>
  );
};

export default LeaderboardModule;
