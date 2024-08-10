import React from 'react';

import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Information } from './components/Information';
import { Statistics } from './components/Statistics';

const Profile = () => {
  // const tabs = [
  //   { name: 'Home', link: '#', content: 'Home Content' },
  //   { name: 'About', link: '#', content: 'About Content' },
  //   { name: 'Contact', link: '#', content: 'Contact Content' },
  // ];
  return (
    <Container className="max-w-screen-xl py-10" px={0}>
      <Stack className="gap-y-5">
        <Information />
        <Statistics />
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Profile;
