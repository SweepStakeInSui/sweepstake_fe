'use client';

import Image from 'next/image';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="p-10 border-solid border-t-[1px] border-dyb-10">
      <Flex className="h-full justify-between items-start">
        <Stack>
          <div className="relative w-10 aspect-square">
            <Image src="/logos/square-logo.svg" alt="logo" fill />
          </div>
          <Typography.Text size={13} className="text-dyb-50">
            Copyright © 2024 SweepStack. All rights reserved.
          </Typography.Text>
        </Stack>
        <Flex className="gap-20 items-start">
          <Stack>
            <Typography.Text size={12} className="text-dyb-50">
              COMPANY
            </Typography.Text>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>Contract</Typography.Text>
            </Button>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>Join our Stack</Typography.Text>
            </Button>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>Privacy Policy</Typography.Text>
            </Button>
          </Stack>

          <Stack>
            <Typography.Text size={12} className="text-dyb-50">
              COMPANY
            </Typography.Text>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>
                Viction Wallet (Extension)
              </Typography.Text>
            </Button>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>Viction Wallet (iOS)</Typography.Text>
            </Button>
            <Button variant="ghost" className="p-0">
              <Typography.Text size={14}>VicMaster</Typography.Text>
            </Button>
          </Stack>

          <Stack>
            <Typography.Text size={12} className="text-dyb-50">
              FOLLOW US
            </Typography.Text>
            <Flex>
              <IconButton icon="Discord" />
              <IconButton icon="Telegram" />
              <IconButton icon="X" />
              <IconButton icon="Github" />
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </footer>
  );
}
