import React from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Information = () => {
  return (
    <Flex className="justify-between p-2  items-start">
      <Flex className="gap-x-6">
        <Avatar size="xl" isRounded>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback />
        </Avatar>
        <Stack className="justify-between">
          <Stack className="gap-y-0.5">
            <Flex>
              <Typography.Heading>Nickname</Typography.Heading>
              <div className="bg-dyb-10 rounded-full py-0.5 px-1.5">
                <Typography.Text size={13}>0x12.4123D</Typography.Text>
              </div>
            </Flex>
            <Typography.Text
              size={14}
              weight="semibold"
              className="text-btn-text"
            >
              Edit nickname
            </Typography.Text>
          </Stack>
          <Flex className="text-text">
            <Typography.Text size={13}>Rank:</Typography.Text>
            <Typography.Text size={13}>#13</Typography.Text>
          </Flex>
        </Stack>
      </Flex>
      <Button variant="terriary">Create Bet</Button>
    </Flex>
  );
};

export default Information;
