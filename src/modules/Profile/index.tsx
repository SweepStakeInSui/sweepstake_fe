import React from 'react';

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
  const tabsProfile = [
    { id: 1, value: 'posts', title: 'Posts', panel: <Posts /> },
    { id: 2, value: 'replies', title: 'Replies', panel: <Posts /> },
    { id: 3, value: 'likes', title: 'Likes', panel: <Likes /> },
    { id: 4, value: 'positions', title: 'Positions', panel: <Positions /> },
    { id: 5, value: 'activity', title: 'Activity', panel: <Activity /> },
    { id: 6, value: 'watchlist', title: 'Watchlist', panel: <Watchlist /> },
    { id: 7, value: 'your_bets', title: 'Your Bets', panel: <YourBets /> },
  ];
  return (
    <Container className="max-w-screen-xl py-10" px={0}>
      <Stack className="gap-y-5">
        <Information />
        <Statistics />
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-5">
            {tabsProfile.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsProfile.map((tab) => (
            <TabsContent key={tab.id} value={tab.value} className="mt-0">
              {tab.panel}
            </TabsContent>
          ))}
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Profile;
