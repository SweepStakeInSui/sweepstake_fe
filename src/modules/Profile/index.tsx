'use client';

import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import withAuth from '@/components/withAuth';

import { Activity } from './components/Activity';
import { BetsCreated } from './components/BetsCreated';
import { Information } from './components/Information';
import { Mention } from './components/Mention';
import { Positions } from './components/Positions';
import { Statistics } from './components/Statistics';
import { Watchlist } from './components/Watchlist';

const Profile = () => {
  const [tab, setTab] = useQueryParam(
    'tab',
    withDefault(StringParam, 'positions'),
  );
  const tabProfile = [
    { value: 'positions', title: 'Positions', panel: <Positions /> },
    { value: 'activity', title: 'Activities', panel: <Activity /> },
    { value: 'watchlist', title: 'Watchlists', panel: <Watchlist /> },
    { value: 'bets_created', title: 'Bets Created', panel: <BetsCreated /> },
    { value: 'mention', title: 'Mentions', panel: <Mention /> },
  ];
  return (
    <Container className="max-w-[50rem] py-10">
      <Stack className="gap-y-5 px-5 lg:px-0">
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

export default withAuth(Profile);
