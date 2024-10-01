'use client';

import React from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import withAuth from '@/components/withAuth';

import { ActionDeposit } from './components/Action';
import { Guide } from './components/Guide';
import { History } from './components/History';

const DepositModule = () => {
  return (
    <Container className="py-10 max-w-screen-xl">
      <Flex className="block items-start lg:flex lg:flex-row-reverse">
        <ActionDeposit />

        <Stack>
          <Guide />
          <History />
        </Stack>
      </Flex>
    </Container>
  );
};

export default withAuth(DepositModule);
