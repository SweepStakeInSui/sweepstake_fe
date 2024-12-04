'use client';

import React, { useState } from 'react';

import Container from '@/components/common/Container';
import Countdown from '@/components/common/Countdown';
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

const tabs = [
  {
    title: 'Day',
    query: 'daily',
  },
  {
    title: 'Week',
    query: 'weekly',
  },
  {
    title: 'Month',
    query: 'monthly',
  },
  {
    title: 'All',
    query: 'all',
  },
];
const LeaderboardModule = () => {
  const [paramSelected, setParamSelected] = useState(tabs.slice(-1)[0]);

  const [select, setSelect] = useState<string>('profit');
  const listTabs = [
    {
      label: 'Profit',
      value: 'profit',
      panel: <ProfitLeaderboard period={paramSelected.query} />,
    },
    {
      label: 'Volume',
      value: 'volume',
      panel: <VolumeLeaderboard period={paramSelected.query} />,
    },
  ];

  const selectedTab = listTabs.find((item) => item.value === select);

  return (
    <Container className="max-w-screen-lg px-4 py-8 lg:py-10" size="sm">
      <Typography.Heading size={32} className="text-text lg:my-4">
        Leaderboard
      </Typography.Heading>
      <div className="relative">
        <Tabs defaultValue={paramSelected.title} className="w-full">
          <TabsList className="my-3">
            {tabs.map((item) => (
              <TabsTrigger
                key={item.query}
                value={item.title}
                onClick={() => setParamSelected(item)}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Flex className="absolute right-0 bottom-5">
          <Stack className="flex-row gap-1 flex-nowrap">
            <Flex className="gap-1 justify-end">
              <Svg src="/icons/timer.svg" />
              <Typography.Text className="text-text" size={13} weight="medium">
                Reset in
              </Typography.Text>
            </Flex>
            <Typography.Text className="text-text" size={13} weight="medium">
              <Countdown />
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
        <ProfitLeaderboard period={paramSelected.query} />
        <VolumeLeaderboard period={paramSelected.query} />
      </div>
    </Container>
  );
};

export default LeaderboardModule;
