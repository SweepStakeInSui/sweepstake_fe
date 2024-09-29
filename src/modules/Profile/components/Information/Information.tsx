import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import type { ProfileTypes } from '@/types/profile';

import { EditProfile } from '../EditProfile';

const Information = () => {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<ProfileTypes>(['user-infor']);

  return (
    <Flex className="justify-between items-start">
      <Flex className="gap-x-6">
        <CustomAvatar
          address={profile?.address}
          src={profile?.avatar}
          size="xl"
          isRounded
        />
        <Stack className="justify-between">
          <Stack className="gap-y-0.5">
            <Typography.Heading>Nickname</Typography.Heading>
            <div className="bg-dyb-10 rounded-full py-0.5 flex justify-center">
              <Typography.Text size={13}>0x12.4123D</Typography.Text>
            </div>
          </Stack>
          <Flex>
            <Typography.Text
              size={13}
              className="text-text-support-yellow"
              weight="medium"
            >
              Rank:
            </Typography.Text>
            <Typography.Text
              size={13}
              className="text-text-support-yellow"
              weight="medium"
            >
              #{profile?.rank}
            </Typography.Text>
          </Flex>
        </Stack>
      </Flex>
      <EditProfile />
    </Flex>
  );
};

export default Information;
