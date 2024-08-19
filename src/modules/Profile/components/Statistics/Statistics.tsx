import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Separator } from '@/components/ui/separator';

const Statistics = () => {
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
              className="text-text"
            >
              $109,000
            </Typography.Heading>
          </Stack>
          <Separator orientation="vertical" />
        </li>
        <li className="flex justify-between">
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle"
            >
              Profit/ loss
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text-support-green"
            >
              $192,000
            </Typography.Heading>
          </Stack>
          <Separator orientation="vertical" />
        </li>
        <li className="flex justify-between">
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle"
            >
              Volume traded
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text"
            >
              $109,000
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
                <Svg
                  src="/icons/info_outline.svg"
                  className="text-icon-subtle"
                />
              </Flex>
              <Typography.Heading
                size={20}
                weight="semibold"
                className="text-text"
              >
                90/100(90%)
              </Typography.Heading>
            </Stack>
            <div style={{ width: 43, height: 43 }}>
              <CircularProgressbar
                value={90}
                styles={buildStyles({
                  pathColor: `#3DA003`,
                  textColor: '#3DA003',
                  textSize: '24px',
                })}
                text="90%"
              />
            </div>
          </Flex>
        </li>
      </ul>
    </section>
  );
};

export default Statistics;
