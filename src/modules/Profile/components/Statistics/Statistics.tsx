import React from 'react';

import Stack from '@/components/common/Stack';
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
          <Stack className="gap-1">
            <Typography.Text
              size={13}
              weight="medium"
              className="text-text-subtle"
            >
              Win rate
            </Typography.Text>
            <Typography.Heading
              size={20}
              weight="semibold"
              className="text-text"
            >
              90/100(90%)
            </Typography.Heading>
          </Stack>
        </li>
      </ul>
    </section>
  );
};

export default Statistics;
