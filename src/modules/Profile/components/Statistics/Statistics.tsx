import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';
import type { ProfileTypes } from '@/types/profile';

const Statistics = () => {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<ProfileTypes>(['user-infor']);
  return (
    <section className="p-2">
      <ul className="grid grid-cols-4 p-6 bg-linear-profile rounded-lg">
        <li className="flex justify-between">
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle"
            >
              Positions value
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text flex"
            >
              $<FormatNumber number={profile?.positionsValue || 0} />
            </Typography.Heading>
          </Stack>
          <Separator orientation="vertical" />
        </li>
        <li className="flex justify-between">
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle flex"
            >
              Profit/ loss
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text-support-green flex"
            >
              $<FormatNumber number={profile?.pnl || 0} />
            </Typography.Heading>
          </Stack>
          <Separator orientation="vertical" />
        </li>
        <li className="flex justify-between">
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle flex"
            >
              Volume traded
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text flex"
            >
              $<FormatNumber number={profile?.volume || 0} />
            </Typography.Heading>
          </Stack>
          <Separator orientation="vertical" />
        </li>
        <li>
          <Flex className="justify-between">
            <Stack className="gap-1">
              <Flex>
                <Typography.Text
                  size={13}
                  weight="medium"
                  className="text-text-subtle"
                >
                  Win rate
                </Typography.Text>
                <Tooltip content="This is your win rate based on your recent performance.">
                  <div>
                    <Svg
                      src="/icons/info_outline.svg"
                      className="text-icon-subtle"
                    />
                  </div>
                </Tooltip>
              </Flex>
              <Typography.Heading
                size={20}
                weight="semibold"
                className="text-text"
              >
                {profile?.winRate || 0}
                {profile?.winRate}/100(%)
              </Typography.Heading>
            </Stack>
            <Tooltip content="Total win bet / Total bet">
              <div style={{ width: 43, height: 43 }}>
                <CircularProgressbar
                  value={profile?.winRate || 0}
                  styles={buildStyles({
                    pathColor: `#3DA003`,
                    textColor: '#3DA003',
                    textSize: '24px',
                  })}
                  text={profile?.winRate?.toString()}
                />
              </div>
            </Tooltip>
          </Flex>
        </li>
      </ul>
    </section>
  );
};

export default Statistics;
