import React from 'react';

import CopiableAddress from '@/components/common/CopiableAddress/CopiableAddress';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Separator } from '@/components/ui/separator';

const Guide = () => {
  const steps = [
    {
      title: 'Step 1:',
      guide: 'Buy USDT on Coinbase, Binance or another exchange',
    },
    {
      title: 'Step 2:',
      guide: 'Send USDT to the address below and select SUI as the network.',
    },
  ];
  return (
    <Stack className="p-5 gap-y-6">
      <Stack>
        <Flex>
          <Typography.Heading size={28} weight="semibold">
            Deposit USDT (Sui)
          </Typography.Heading>
          <Svg src="/icons/LeadingSlot.svg" />
          <Typography.Heading size={28} weight="semibold">
            to Your Wallet
          </Typography.Heading>
        </Flex>
        <Typography.Text size={14} className="text-text-subtle">
          Send USDT (on Sui) to the address below from an exchange or wallet and
          receive the equivalent value (minus 0.3% of deposit fees) in your
          Sweepstake wallet in ~3 minutes.
        </Typography.Text>
      </Stack>
      <Flex className="gap-x-5">
        {steps.map((step) => (
          <div key={step.title}>
            <Typography.Text
              size={15}
              className="text-text-support-red"
              weight="bold"
            >
              {step.title}
            </Typography.Text>
            <Typography.Text size={15} className="text-text mt-1.5">
              {step.guide}
            </Typography.Text>
          </div>
        ))}
      </Flex>
      <CopiableAddress
        address="0x825AE76B945F4713c4d6A9a27eA78a3C0dA147e6"
        className="h-12 items-center px-3 bg-bg-sublest border border-borderSubtle rounded-lg"
      />
      <Separator className="bg-borderSubtle" />
    </Stack>
  );
};

export default Guide;
