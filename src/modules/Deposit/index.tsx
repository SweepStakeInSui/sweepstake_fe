'use client';

import React from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import withAuth from '@/components/withAuth';

import { Balance } from './components/Balance';
import { Guide } from './components/Guide';
import { History } from './components/History';

const DepositModule = () => {
  return (
    <Container className="py-10 max-w-screen-xl">
      <Flex className="items-start">
        <Stack>
          <Guide />
          <History />
        </Stack>
        <Balance />
      </Flex>
    </Container>
  );
};

export default withAuth(DepositModule);
