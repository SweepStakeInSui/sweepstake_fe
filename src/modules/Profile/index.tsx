'use client';

import React from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Activity } from './components/Activity';
import { Information } from './components/Information';
import { Likes } from './components/Likes';
import { Positions } from './components/Positions';
import { Posts } from './components/Posts';
import { Statistics } from './components/Statistics';
import { Watchlist } from './components/Watchlist';
import { YourBets } from './components/YourBets';

const Profile = () => {
  const [tab, setTab] = useQueryParam(
    'tab',
    withDefault(StringParam, 'positions'),
  );
  const tabProfile = [
    { value: 'positions', title: 'Positions', panel: <Positions /> },
    { value: 'activity', title: 'Activity', panel: <Activity /> },
    { value: 'watchlist', title: 'Watchlist', panel: <Watchlist /> },
    { value: 'your_bets', title: 'Your Bets', panel: <YourBets /> },
    { value: 'posts', title: 'Posts', panel: <Posts /> },
    { value: 'replies', title: 'Replies', panel: <Posts /> },
    { value: 'likes', title: 'Likes', panel: <Likes /> },
  ];
  return (
    <Container className="max-w-screen-xl py-10" px={0}>
      <Stack className="gap-y-5">
        <Information />
        <Statistics />
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="mb-5">
            {tabProfile.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                onClick={() => setTab(item.value)}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabProfile.map((item) => (
            <TabsContent key={item.value} value={item.value} className="mt-0">
              {item.panel}
            </TabsContent>
          ))}
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Profile;
